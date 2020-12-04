'use strict';

const GithubSlugger = require('github-slugger');
const InvalidJsdocError = require('./InvalidJsdocError');

const MEMBERSHIPS = {
  '.': 'static',
  '#': 'instance',
  '~': 'inner',
};

/**
 * Enhances a JSDoc member list with outline metadata and relation references.
 * @kind function
 * @name outlineMembers
 * @param {Array<JsdocMember>} members JSDoc members.
 * @param {CodeFilesMap} codeFiles Map of code file paths and their code.
 * @returns {Array<JsdocMember>} Outlined JSDoc members.
 * @ignore
 */
module.exports = function outlineMembers(members, codeFiles) {
  if (!Array.isArray(members))
    throw new TypeError('First argument “members” must be an array.');

  if (!(codeFiles instanceof Map))
    throw new TypeError('Second argument “codeFiles” must be a Map instance.');

  // Prevent modification of the input array.
  const outline = members.slice();
  const slugger = new GithubSlugger();

  for (const member of outline) {
    // Is the member top-level, or nested?
    if (member.memberof) {
      // Set the parent property.
      const parent = outline.find((mem) => mem.namepath === member.memberof);
      if (!parent)
        throw new InvalidJsdocError(
          `Missing JSDoc member for namepath “${member.memberof}”.`,
          member.codeFilePath,
          member.codeJsdocLocation,
          codeFiles.get(member.codeFilePath)
        );
      member.parent = parent;

      // Update the parent member’s children property.
      if (!Array.isArray(parent.children)) parent.children = [];
      parent.children.push(member);
    }

    // Set the heading property.
    member.heading = '';

    if (member.memberof) {
      member.heading += `${member.memberof} `;

      if (member.kind !== 'event')
        member.heading += `${MEMBERSHIPS[member.membership]} `;
    }

    member.heading +=
      member.kind === 'function' &&
      member.parent &&
      member.parent.kind === 'class' &&
      member.membership !== '~'
        ? 'method '
        : member.kind === 'member' &&
          member.membership &&
          member.membership !== '~'
        ? 'property '
        : member.kind === 'typedef'
        ? 'type '
        : `${member.kind} `;

    member.heading +=
      member.kind === 'event'
        ? member.name.replace(/^event:/, '')
        : member.name;

    // Set the slug property.
    member.slug = slugger.slug(member.heading);
  }

  return outline;
};

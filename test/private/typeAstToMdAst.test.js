'use strict';

const { throws } = require('assert');
const { resolve } = require('path');
const gfm = require('remark-gfm');
const stringify = require('remark-stringify');
const snapshot = require('snapshot-assertion');
const unified = require('unified');
const REMARK_STRINGIFY_OPTIONS = require('../../private/REMARK_STRINGIFY_OPTIONS');
const codeToJsdocComments = require('../../private/codeToJsdocComments');
const outlineMembers = require('../../private/outlineMembers');
const typeAstToMdAst = require('../../private/typeAstToMdAst');
const typeToTypeAst = require('../../private/typeToTypeAst');
const jsdocCommentsToMembers = require('../jsdocCommentsToMembers');

const TEST_CODE_FILE_PATH = '/a.js';

module.exports = (tests) => {
  tests.add(
    '`typeAstToMdAst` with first argument `typeJsdocAst` not an object.',
    () => {
      throws(() => {
        typeAstToMdAst(true);
      }, new TypeError('First argument `typeJsdocAst` must be an object.'));
    }
  );

  tests.add(
    '`typeAstToMdAst` with second argument `members` not an array.',
    () => {
      throws(() => {
        typeAstToMdAst({}, true);
      }, new TypeError('Second argument `members` must be an array.'));
    }
  );

  tests.add('`typeAstToMdAst` with various types.', async () => {
    const code = `/**
 * @kind typedef
 * @name B
 */`;
    const codeFiles = new Map([[TEST_CODE_FILE_PATH, code]]);
    const jsdocComments = await codeToJsdocComments(code, TEST_CODE_FILE_PATH);
    const members = jsdocCommentsToMembers(
      jsdocComments,
      codeFiles,
      TEST_CODE_FILE_PATH
    );
    const outlinedMembers = outlineMembers(members, codeFiles);

    for (const [name, typeJsdocString] of [
      ['AllLiteral', '*'],
      ['NullableLiteral', '?'],
      ['NullLiteral', 'null'],
      ['UndefinedLiteral', 'undefined'],
      ['NumericLiteralType', '1'],
      ['StringLiteralType', '"a"'],
      ['StringLiteralType empty', '""'],
      ['StringLiteralType space', '" "'],
      ['StringLiteralType tab', '"  "'],
      ['BooleanLiteralType', 'true'],
      ['RestType', '...*'],
      ['OptionalType', '*='],
      ['UnionType', '*|void'],
      ['TypeApplication', 'Array<*>'],
      ['TypeApplication with multiple applications', 'Array<*, *>'],
      ['ArrayType', '[*]'],
      ['ArrayType with multiple items', '[*, *]'],
      ['FieldType', '{a:*}'],
      ['RecordType', '{a:*, b:*}'],
      ['NameExpression', 'A'],
      ['NameExpression with member link', 'B'],
      ['FunctionType', 'function()'],
      ['FunctionType with return', 'function(): *'],
      ['FunctionType with return and VoidLiteral', 'function(): void'],
      ['FunctionType with parameter', 'function(*)'],
      ['FunctionType with multiple parameters', 'function(*, *)'],
      ['FunctionType with new', 'function(new:A)'],
      ['FunctionType with new and param', 'function(new:A, *)'],
      ['FunctionType with this', 'function(this:A)'],
      ['FunctionType with this and param', 'function(this:A, *)'],
    ])
      tests.add(`\`typeAstToMdAst\` with type ${name}.`, async () => {
        const typeMdAst = typeAstToMdAst(
          typeToTypeAst({
            type: typeJsdocString,
            // Allow all features, including optional (`*=`) and rest (`...*`)
            // parameters.
            parameter: true,
          }),
          outlinedMembers
        );

        const snapshotFileName = name.replace(/ /g, '-');

        await snapshot(
          JSON.stringify(typeMdAst, null, 2),
          resolve(
            __dirname,
            `../snapshots/typeAstToMdAst/${snapshotFileName}.json`
          )
        );

        await snapshot(
          unified()
            .use(gfm)
            .use(stringify, REMARK_STRINGIFY_OPTIONS)
            .stringify({
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: typeMdAst,
                },
              ],
            }),
          resolve(
            __dirname,
            `../snapshots/typeAstToMdAst/${snapshotFileName}.md`
          )
        );
      });
  });

  tests.add('`typeAstToMdAst` with an unknown type.', () => {
    throws(() => {
      typeAstToMdAst({ type: 'MadeUp' }, []);
    }, new TypeError('Unknown JSDoc type `MadeUp`.'));
  });
};
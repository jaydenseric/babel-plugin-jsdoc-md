'use strict';

const { TestDirector } = require('test-director');

const tests = new TestDirector();

require('./replaceStackTraces.test')(tests);
require('./cli/jsdoc-md.test')(tests);
require('./private/codeToJsdocComments.test')(tests);
require('./private/deconstructJsdocNamepath.test')(tests);
require('./private/jsdocCommentToMember.test')(tests);
require('./private/mdFileReplaceSection.test')(tests);
require('./private/mdToMdAst.test')(tests);
require('./private/membersToMdAst.test')(tests);
require('./private/outlineMembers.test')(tests);
require('./private/parseJsdocExample.test')(tests);
require('./private/remarkPluginReplaceSection.test')(tests);
require('./private/replaceJsdocLinks.test')(tests);
require('./private/reportCliError.test')(tests);
require('./private/typeJsdocAstToMdAst.test')(tests);
require('./private/typeJsdocStringToJsdocAst.test')(tests);
require('./private/unescapeJsdoc.test')(tests);
require('./public/jsdocMd.test')(tests);

tests.run();

import TestDirector from 'test-director';
import testJsdocMdCli from './cli/jsdoc-md.test.mjs';
import testCliError from './private/CliError.test.mjs';
import testCodeLocation from './private/CodeLocation.test.mjs';
import testCodePosition from './private/CodePosition.test.mjs';
import testInvalidJsdocError from './private/InvalidJsdocError.test.mjs';
import testCodePositionToIndex from './private/codePositionToIndex.test.mjs';
import testCodeToJsdocComments from './private/codeToJsdocComments.test.mjs';
import testDeconstructJsdocNamepath from './private/deconstructJsdocNamepath.test.mjs';
import testGetJsdocBlockDescriptionSource from './private/getJsdocBlockDescriptionSource.test.mjs';
import testGetJsdocSourceTokenCodeLocation from './private/getJsdocSourceTokenCodeLocation.test.mjs';
import testJsdocCommentToMember from './private/jsdocCommentToMember.test.mjs';
import testJsdocDataMdToMdAst from './private/jsdocDataMdToMdAst.test.mjs';
import testJsdocDataTypeToMdAst from './private/jsdocDataTypeToMdAst.test.mjs';
import testMdFileReplaceSection from './private/mdFileReplaceSection.test.mjs';
import testMembersToMdAst from './private/membersToMdAst.test.mjs';
import testOutlineMembers from './private/outlineMembers.test.mjs';
import testRemarkPluginReplaceSection from './private/remarkPluginReplaceSection.test.mjs';
import testReportCliError from './private/reportCliError.test.mjs';
import testTypeAstToMdAst from './private/typeAstToMdAst.test.mjs';
import testTypeToTypeAst from './private/typeToTypeAst.test.mjs';
import testUnescapeJsdoc from './private/unescapeJsdoc.test.mjs';
import testJsdocMd from './public/jsdocMd.test.mjs';
import testReplaceStackTraces from './replaceStackTraces.test.mjs';

const tests = new TestDirector();

testJsdocMdCli(tests);
testCliError(tests);
testCodeLocation(tests);
testCodePosition(tests);
testCodePositionToIndex(tests);
testCodeToJsdocComments(tests);
testDeconstructJsdocNamepath(tests);
testGetJsdocBlockDescriptionSource(tests);
testGetJsdocSourceTokenCodeLocation(tests);
testInvalidJsdocError(tests);
testJsdocCommentToMember(tests);
testJsdocDataMdToMdAst(tests);
testJsdocDataTypeToMdAst(tests);
testMdFileReplaceSection(tests);
testMembersToMdAst(tests);
testOutlineMembers(tests);
testRemarkPluginReplaceSection(tests);
testReportCliError(tests);
testTypeAstToMdAst(tests);
testTypeToTypeAst(tests);
testUnescapeJsdoc(tests);
testJsdocMd(tests);
testReplaceStackTraces(tests);

tests.run();
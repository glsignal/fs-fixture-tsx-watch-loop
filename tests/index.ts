import path from "path";
import { createRequire } from "node:module";
import { createFixture } from "fs-fixture";
import { testSuite, runTestSuite, expect } from 'manten';

const require = createRequire(import.meta.url);

runTestSuite(testSuite(({ test }) => {
  test('with fixture', async () => {
    await using fixture = await createFixture({
      test: "module.exports = 'my file';"
    });

    expect(
      require(path.join(fixture.path, 'test')),
    ).toStrictEqual("my file");

    // also happens with this
    // const content = await import(path.join(fixture.path, 'test'));
    // expect(content.default).toEqual("my file");

    expect(fixture.path).not.toBeNull();
  });
}));


import { rollup, OutputAsset, OutputChunk } from 'rollup'

function createPreprocessor(preconfig, config, emitter, logger) {

  return async function preprocess(original, file, done) {
    try {
      const options = Object.assign(
        {},
        config.rollupPreprocessor,
        preconfig.options,
        {
          input: file.path
        }
      );

      const bundle = await rollup(options);
      const { output } = await bundle.generate(options);

      for (const result of output) {
        const isAsset = (result as OutputAsset).isAsset
        if (!isAsset) {
          const { code, map } = result as OutputChunk;
          const { sourcemap } = options.output;

          file.sourceMap = map;

          const processed =
            sourcemap === "inline"
              ? code + `\n//# sourceMappingURL=${map.toUrl()}\n`
              : code;

          file.path = file.path.replace('.ts', '.js')

          return done(null, processed);
        }
      }
      done(null, original);
    } catch (error) {
      done(error, null);
    }
  };
}

createPreprocessor.$inject = ["args", "config", "emitter", "logger"]

export { createPreprocessor }
'use strict';

const Parcel = require('@parcel/core').default;

(async () => {
  const parcel = new Parcel({
    entries: './src/index.html',
    defaultConfig: require.resolve('@parcel/config-default'),
    // logLevel: 'verbose',
    // targets: {
    //   default: {
    //     distDir: '../dist',
    //     distEntry: 'index.html',
    //     source: '../views/index.html',
    //   },
    // },
    mode: 'production',
    additionalReporters: [{ packageName: '@parcel/reporter-cli', resolveFrom: __filename }],
  });

  try {
    const everything = await parcel.run();
    let { bundleGraph, buildTime } = everything;
    console.log('everything');
    console.log(everything);

    console.log('bundlegraph');
    console.log(bundleGraph);
    let bundles = bundleGraph.getBundles();
    console.log('bundles');
    for (bundle of bundles) {
      console.log(bundle);
    }

    console.log(`✨ Built ${bundles.length} bundles in ${buildTime}ms!`);
  } catch (err) {
    console.log(err.diagnostics);
  }

  // await parcel.run().catch((err) => console.log(err));
  console.log('end');
})();

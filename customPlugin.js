const sassPlugin = () => {
  return {
    name: 'kenny-sass',
    setup(build) {
      build.onStart(() => {
        console.log('*********** IT STARTED **********');
      });

      build.onResolve({ filter: /.scss$/ }, (args) => {
        console.log('on resolve got something');
        console.log(args);

        return {
          path: args.path,
        };
      });

      build.onLoad({ filter: /.scss$/ }, (args) => {
        console.log('on load got something');
        console.log(args);
        return {};
      });

      build.onEnd(() => {
        console.log('*********** IT ENDED **********');
      });
    },
  };
};

module.exports = sassPlugin;

const pluginName = 'BundleDistPlugin';

class BundleDistPlugin {
    apply(compiler) {
        compiler.hooks.afterEmit.tapAsync(pluginName, (compilation,callback) => {
            // 压缩dist
            const fileName = 'dist.rar',
                outputPath = './',
                distDirectory = './dist',
                WinRARPath = 'C:\\Program Files\\WinRAR\\rar'

            var exec = require('child_process').exec;
            var cmdStr = `"${WinRARPath}" a ${outputPath}${fileName} ${distDirectory}`;
            exec(cmdStr, function(err,stdout,stderr){
                if(err) {
                    console.error(err);
                    throw err
                }else {
                    console.log(`\x1b[46;30m WinRAR DONE \x1b[0;32m successful bundle ${distDirectory} into ${outputPath}${fileName}\x1b[0m`)
                    callback()
                }
            });
        });
    }
}

module.exports = BundleDistPlugin
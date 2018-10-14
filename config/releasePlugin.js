const os = require('os');
const fs = require('fs')
const path = require('path');
// const node_ssh = require('node-ssh');
const child_process = require('child_process');
const Handlebars = require("handlebars");
const fsExtra = require('fs-extra');
// const ssh = new node_ssh();
const buildPath = path.join(path.dirname(__dirname), 'build');
module.exports = class EndWebpackPlugin {
    constructor(context) {
        this.context = context;
        this.fileName = this.context.name + "-" + this.context.type + ".sh";
        this.runSH(this.fileName, this.context);
    }
    apply(compiler) {
        // return
        compiler.plugin('done', (stats) => {
            setTimeout(async () => {
                this.release(this.fileName)
            });
        });
    }
    /**
     * 生成sh 文件
     * @param {*} fileName 文件名称 
     * @param {*} context 文件配置
     */
    async  runSH(fileName, context) {
        // const source = await fsExtra.readFile(path.join(__dirname, "temporary.sh"))
        const source = `
            rm -rf ./{{name}}.web.tar.gz

            # 打包
            cd ./{{name}} && tar -zcf ../{{name}}.web.tar.gz * && cd ../../
            
            # 创建指定目录
            ssh -p 22 root@{{host}} "mkdir -p /data/websites/{{name}}.web/"
            
            # 发布
            scp -P 22 -r ./build/{{name}}.web.tar.gz root@{{host}}:/data/websites/{{name}}.web.tar.gz
            
            # 解压
            ssh -p 22 root@{{host}} "tar -xzf /data/websites/{{name}}.web.tar.gz -C /data/websites/{{name}}.web"

            rm -rf ./build/{{name}}.web.tar.gz
        `
        const template = Handlebars.compile(source.toString());
        const result = template({
            ...context,
            name: context.name.toLocaleLowerCase(),
        });
        await fsExtra.writeFile(path.join(buildPath, fileName), result);
    }
    /**
     * 只是发布脚本 sh 文件
     * @param {*} fileName 
     */
    release(fileName) {
        child_process.exec(`"${fileName}"`, { cwd: buildPath }, (error, stdout, stderr) => {
            console.log("");
            console.log('--------------------------------- releasePlugin ---------------------------------')
            console.log("");
            if (error) {
                console.error(`                           发布失败: ${error}`);
                return;
            }
            console.log(`                             成功发布: ${this.context.host}`);
            console.log("");
            console.log('--------------------------------- releasePlugin ---------------------------------')
            console.log("");
        });
    }
}
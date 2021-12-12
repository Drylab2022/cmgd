import {Configuration, configure, getLogger, Logger} from "log4js"

//针对日志的当前配置
var currentConfig: Configuration = {
    //日志的输出器
    appenders: {
        //1.1.设置控制台输出 （默认日志级别是关闭的（即不会输出日志）)
        console_out: {type: 'console'},
        //1.2.控制台输出过滤器(它的输出是上面的错误输出日志,只不过对输入进行了一次过滤,只有严重到一定程度的才会输出)
        console_out_filter: {
            type: "logLevelFilter",
            //level: "info", //只要是信息以上的都显示
            level: "error", //严重到错误以上才显示
            appender: 'console_out'
        },
        //2.所有日志记录，文件类型file   文件最大值maxLogSize 单位byte (B->KB->M) backups:备份的文件个数最大值,最新数据覆盖旧数据
        //不管任何日志信息都会记录其中
        full_out: {
            type: 'file',
            filename: __dirname + '/logs/all.log',
            keepFileExt: true,
            maxLogSize: 10485760,
            backups: 3
        },
        //3.1.信息输出日志
        info_output: {type: 'file', filename: __dirname + '/logs/info.log'},
        //3.2.错误输出过滤器(它的输出是上面的错误输出日志,只不过对输入进行了一次过滤,只有严重到一定程度的才会输出)
        info_output_filter: {type: "logLevelFilter", level: "info", appender: 'info_output'},
        //4.1.警告输出日志
        warning_output: {type: 'file', filename: __dirname + '/logs/warning.log'},
        //4.2.警告输出过滤器(它的输出是上面的警告输出日志,只不过对输入进行了一次过滤,只有严重到一定程度的才会输出)
        warning_output_filter: {type: "logLevelFilter", level: "warn", appender: 'warning_output'},
        //5.1.错误输出日志
        error_output: {type: 'file', filename: __dirname + '/logs/error.log'},
        //5.2.错误输出过滤器(它的输出是上面的错误输出日志,只不过对输入进行了一次过滤,只有严重到一定程度的才会输出)
        error_output_filter: {type: "logLevelFilter", level: "error", appender: 'error_output'}
    },
    //不同等级的日志追加到不同的输出位置：appenders: ['out', 'allLog']  categories 作为getLogger方法的键名对应
    categories: {
        default: {
            appenders: ['console_out_filter', 'full_out',//
                'info_output_filter', 'warning_output_filter', 'error_output_filter'],
            level: 'all'//从产生的角度而言，所有级别的都生成
        },
    }
};

configure(currentConfig);

//以下暴露出去的使用接口
export var log: Logger = getLogger();

//以下为单元测试代码
if (module === require.main) {
    log.info("信息提示测试");
    log.warn("警告测试");
    log.error("报错测试");
}

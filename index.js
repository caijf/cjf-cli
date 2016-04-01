//vi cjf/index.js
var fis = module.exports =  require('fis3');

fis.require.prefixes.unshift('cjf');
fis.cli.name = 'cjf';
fis.cli.info = require('./package.json');

// 加 md5
// fis.match('*.{js,css,png}', {
//     useHash: true
// });

// 启用 fis-spriter-csssprites 插件
// fis.match('::package', {
//     spriter: fis.plugin('csssprites')
// })

// 对 CSS 进行图片合并
// fis.match('*.css', {
//     // 给匹配到的文件分配属性 `useSprite`
//     useSprite: true
// });

// fis.match('*.js', {
//     // fis-optimizer-uglify-js 插件进行压缩，已内置
//     optimizer: fis.plugin('uglify-js')
// });

// fis.match('*.css', {
//     // fis-optimizer-clean-css 插件进行压缩，已内置
//     optimizer: fis.plugin('clean-css')
// });

// fis.match('*.png', {
//     // fis-optimizer-png-compressor 插件进行压缩，已内置
//     optimizer: fis.plugin('png-compressor')
// });


// // 所有的 js
// fis.match('**.js', {
//     //发布到/static/js/xxx目录下
//     release: '/static/js$0'
// });

// // 所有的 css
// fis.match('**.css', {
//     //发布到/static/css/xxx目录下
//     release: '/static/css$0'
// });

// // 所有image目录下的.png，.gif文件
// fis.match('/images/(*.{png,gif})', {
//     //发布到/static/pic/xxx目录下
//     release: '/static/pic/$1$2'
// });

// fis.match('_*.js', {
//     release: false
// })


// fis.match('*.html', {
//     useMap: true
// })

// 给后缀是 .es6 的文件配置了一个 parser 属性，属性值是启用了一个叫 babel 的插件，将 es6 编译为 es5，供浏览器执行。
// fis.match('*.es6', {
//     parser: fis.plugin('babel'),
//     rExt: '.js' // 代码编译产出时，后缀改成 .js
// });

// 忽略哪些文件
// fis.set('project.ignore', [
//     'output/**',
//     'node_modules/**',
//     '.git/**',
//     '.svn/**',
//     'fis-conf.js',
//     'README.md',
//     'package.json'
// ]);

// fis.media('debug').match('*.{js,css,png}', {
//     useHash: false,
//     useSprite: false,
//     optimizer: null
// });

// fis.media('qa').match('*', {
//     deploy: fis.plugin('local-deliver', {
//         to: '/Users/caijf/work/htdocs'
//     })
// });



// 忽略哪些文件
fis.set('project.ignore', [
    'output/**',
    'node_modules/**',
    '.git/**',
    '.svn/**',
    'fis-conf.js',
    'README.md',
    'package.json'
]);

// 所有文件编译流程，单文件
// parser -> prefrocessor -> standard -> postprocessor -> optimizer

// 打包过程，全部文件
// prepackager -> packager -> spriter -> postpackager




// 静态资源前端加载器，用来分析页面中使用的和依赖的资源（js或css）, 并将这些资源做一定的优化后插入页面中。如把零散的文件合并。
fis.match('::package', {
    postpackager: fis.plugin('loader')
})
// 如果你希望某类 isHtmlLike 为 true 的资源，不经过此插件处理，那么请设置 loaderLang 属性为 false。
.match('*.md', {
    loaderLang: false
});

//---------- css process start ----------//
// css/less prefixer
fis.match('*.{css,less,html:css,html:less}', {
    postprocessor: fis.plugin('cssautoprefixer')
})
// 下划线开头的 less文件不发布
.match('_*.less', {
    release: false
})
// parser less
.match('*.{less,html:less}', {
    parser: fis.plugin('less', {
        sourceMap: true
    }),
    rExt: '.css'
})
// css 压缩，保持换行
// .match('**.{css,less,html:css}', {
//     optimizer: fis.plugin('clean-css', {
//         keepBreaks: true
//     })
// })
// release
.match('/less/(**.{less,css})', {
    release: '/static/css/$1'
});
//---------- css process end ----------//


//---------- image process start ----------//
// png 压缩
fis.match('/images/*.png', {
  optimizer: fis.plugin('png-compressor')
})
// release
.match('/images/**', {
    release: '/static$0'
});
//---------- image process end ----------//


//---------- font process start ----------//
// release
fis.match('/fonts/**', {
    release: '/static$0'
})
//---------- font process end ----------//


//---------- javascript process start ----------//
// components 目录不发布
fis.match('components/**', {
    release: false
})
// release
.match('/js/**.js', {
    release: '/static$0'
})
.match('/third/**', {
    release: '/static$0'
});
//---------- javascript process end ----------//




// debug


// prod
fis
    .media('prod')
    // less sourceMap
    .match('*.{less,html:less}', {
        parser: fis.plugin('less', {
            sourceMap: false
        })
    })
    // css 压缩
    .match('**.{css,less,html:css}', {
        optimizer: fis.plugin('clean-css', {
            keepBreaks: false
        })
    })
    // js压缩
    .match('**.js', {
        optimizer: fis.plugin('uglify-js', {
            compress : {
                //自动去除console.log等调试信息
                drop_console: true,
                // remove debugger; statements
                drop_debugger: true
            }
        })
    })

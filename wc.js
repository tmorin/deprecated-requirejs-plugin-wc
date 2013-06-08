define(['module'], function (module) {
    'use strict';

    var wc,
        impRegEx = /!imp/,
        decRegEx = /!dec/,
        polymerRegEx = /!polymer/,
        xtagRegEx = /!xtag/,
        masterConfig = (module.config && module.config()) || {};

    /**
     * get the platform module from the requirejs config
     * TODO: get it from the master config too!
     */
    function getPlatformModule(config) {
        var platformModule = config.config && config.config.ws && config.config.ws.platformModule;
        return platformModule;
    }

    /**
     * get the platform module from the requirejs config
     * TODO: get it from the master config too!
     */
    function getXTagModule(config) {
        var xTagModule = config.config && config.config.ws && config.config.ws.xTagModule;
        return xTagModule;
    }

    /**
     * get the platform module from the requirejs config
     * TODO: get it from the master config too!
     */
    function getPolymerModule(config) {
        var polymerModule = config.config && config.config.ws && config.config.ws.polymerModule;
        return polymerModule;
    }

    /**
     * register a standard web component, using document.register()
     */
    function registerStdComponent(tagName, wcPrototype, parentRequire, onLoad, config) {
        var tag, platformModule;
        if (document.register) {
            tag = document.register(tagName, wcPrototype);
            onLoad(tag);
        } else {
            platformModule = getPlatformModule(config);
            if (platformModule) {
                parentRequire([platformModule], function () {
                    if (document.register) {
                        tag = document.register(tagName, wcPrototype);
                        onLoad(tag);
                    } else {
                        onLoad.error(new Error('platform has been load, but document.register is undefined'));
                    }
                }, function (err) {
                    onLoad.error(new Error('unable to load the platform module', err));
                });
            } else {
                onLoad.error(new Error('platformModule not configured'));
            }
        }
    }

    /**
     * register a x-tag web component, using xtag.register()
     */
    function registerXTagComponent(tagName, wcPrototype, parentRequire, onLoad, config) {
        var tag,
            xTagModule = getXTagModule(config);
        if (xTagModule) {
            parentRequire([xTagModule], function (xtag) {
                tag = xtag.register(tagName, wcPrototype);
                onLoad(tag);
            }, function (err) {
                onLoad.error(new Error('unable to load the xtag module', err));
            });
        } else {
            onLoad.error(new Error('xTagModule not configured'));
        }
    }

    function getElementNameFromResourceName(name) {
        var index = name.lastIndexOf('/');
        if (index > -1) {
            return name.substring(index + 1);
        }
        return name;
    }

    /**
     * the web document is get with an imperative way
     */
    function loadImp(name, parentRequire, onLoad, config) {
        var moduleName = formatModuleName(name),
            isPolymer = polymerRegEx.test(name),
            isXTag = xtagRegEx.test(name);

        if (config.config && config.config.ws && config.config.ws.debug) {
            console.log('wc', 'isPolymer', isPolymer, 'isXTag', isXTag);
            console.log('Polymer', !!window.Polymer, 'xtag', !!window.xtag);
        }

        parentRequire([moduleName], function (wcPrototype) {
            var tagName = getElementNameFromResourceName(moduleName);
            if (isPolymer) {
                registerStdComponent(tagName, wcPrototype, parentRequire, onLoad, config);
            } else if (isXTag) {
                registerXTagComponent(tagName, wcPrototype, parentRequire, onLoad, config);
            } else {
                registerStdComponent(tagName, wcPrototype, parentRequire, onLoad, config);
            }
        }, function (err) {
            onLoad.error(err);
        });
    }

    function registerHTMLElements(name, parentRequire, onLoad, config, elementNodes) {
        var module,
            isPolymer = polymerRegEx.test(name),
            isXTag = xtagRegEx.test(name),
            platform = isPolymer ? 'polymer' : isXTag ? 'xtag' : '';

        if (isPolymer) {
            module = getPolymerModule(config);
        } else {
            module = getPlatformModule(config);
        }

        if (module) {
            parentRequire([module], function (polymer) {
                var tags = Array.prototype.map.call(elementNodes, function (node) {
                    var div = document.createElement('div'),
                        result;
                    div.appendChild(node);
                    if (isPolymer) {
                        window.CustomElements.parser.parse(div);
                        result = window[node.getAttribute('constructor')];
                    } else {
                        //window.CustomElements.parser.parse(div);
                        //result = window[node.getAttribute('constructor')];
                        //document.body.appendChild(node);
                        console.log(node);
                        result = document.register(node.getAttribute('name'), {
                             prototype: node
                        });
                        result = null;
                    }
                    return result;
                });
                onLoad(tags.length > 1 ? tags : tags[0]);
            }, function (err) {
                onLoad.error(new Error('unable to load the polymer module', err));
            });
        } else {
            onLoad.error(new Error('polymerModule not configured'));
        }
    }

    /**
     * the web document is get with a declarative way
     */
    function loadDec(name, parentRequire, onLoad, config) {
        var moduleName = formatModuleName(name),
            isPolymer = polymerRegEx.test(name),
            isXTag = xtagRegEx.test(name);

        if (config.config && config.config.ws && config.config.ws.debug) {
            console.log('wc', 'isPolymer', isPolymer, 'isXTag', isXTag);
            console.log('Polymer', !!window.Polymer, 'xtag', !!window.xtag);
        }

        parentRequire(['text!' + moduleName], function (wcStr) {
            var div = document.createElement('div'),
                elementNodes,
                importNodes,
                importedModules,
                baseImportUrl = /.*\//.exec(moduleName) || '',
                platform = isPolymer ? '!polymer' : '';

            div.innerHTML = wcStr;
            elementNodes = div.querySelectorAll('element');
            importNodes = div.querySelectorAll('link[rel="import"]');

            if (importNodes.length > 0) {
                importedModules = Array.prototype.map.call(importNodes, function (node) {
                    return 'wc!' + baseImportUrl + node.getAttribute('href') + '!dec' + platform;
                });
                require(importedModules, function () {
                    registerHTMLElements(name, parentRequire, onLoad, config, elementNodes);
                });
            } else {
                registerHTMLElements(name, parentRequire, onLoad, config, elementNodes);
            }
        }, function (err) {
            onLoad.error(err);
        });
    }

    function formatModuleName(name) {
        return name
                .replace('!imp', '')
                .replace('!dec', '')
                .replace('!polymer', '')
                .replace('!xtag', '');
    }

    wc = {
        load: function (name, parentRequire, onLoad, config) {
            var isImp = impRegEx.test(name),
                isDec = decRegEx.test(name);

            if (config.config && config.config.ws && config.config.ws.debug) {
                console.log('wc', 'will load', arguments);
                console.log('wc', 'isImp', isImp, 'isDec', isDec);
            }

            if (isImp) {
                loadImp(name, parentRequire, onLoad, config);
            } else if (isDec) {
                loadDec(name, parentRequire, onLoad, config);
            } else {
                throw "no mode !imp or !dec found!";
            }

        }
    }

    return wc;
});

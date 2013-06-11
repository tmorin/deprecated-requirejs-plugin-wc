define(['module'], function (module) {
    'use strict';

    var wc,
        impRegEx = /!imp/,
        decRegEx = /!dec/,
        polymerRegEx = /!polymer/,
        xtagRegEx = /!xtag/,
        masterConfig = (module.config && module.config()) || {};


    /* HELPERS */


    /**
     * Check if the debug mode is enabled
     * @param {object} config the call's config
     * @returns {boolean} true if the debug mode is enabled else false
     */
    function isDebugEnabled(config) {
        if (config.config && config.config.ws && config.config.ws) {
            return config.config.ws.debug;
        }
        return masterConfig.ws && masterConfig.ws.debug;
    }

    /**
     * Get the standard module name from the requirejs config
     * @param {object} config the call's config
     * @returns {string} the configured standard module name
     */
    function getStandardModule(config) {
        if (config.config && config.config.ws && config.config.ws) {
            return config.config.ws.standardModule;
        }
        return masterConfig.ws && masterConfig.ws.standardModule;
    }

    /**
     * Get the xtag module name from the requirejs config
     * @param {object} config the call's config
     * @returns {string} the configured xtag module name
     */
    function getXTagModule(config) {
        if (config.config && config.config.ws && config.config.ws) {
            return config.config.ws.xTagModule;
        }
        return masterConfig.ws && masterConfig.ws.xTagModule;
    }

    /**
     * Get the platform module name from the requirejs config
     * @param {object} config the call's config
     * @returns {string} the configured poymer module name
     */
    function getPolymerModule(config) {
        if (config.config && config.config.ws && config.config.ws) {
            return config.config.ws.polymerModule;
        }
        return masterConfig.ws && masterConfig.ws.polymerModule;
    }

    /**
     * Get the default platform from the requirejs config
     * @param {object} config the call's config
     * @returns {string} the default platform
     */
    function getDefaultPlatform(config) {
        if (config.config && config.config.ws && config.config.ws) {
            return config.config.ws.defaultPlatform;
        }
        return masterConfig.ws && masterConfig.ws.defaultPlatform;
    }

    /**
     * Get the current platform from the requirejs config and the resource's name.
     * @param {string} resourceName the resource's name
     * @param {object} config the call's config
     * @returns {string} the platform or null if not detected
     */
    function getCurrentPlatform(resourceName, config) {
        var isPolymer = polymerRegEx.test(resourceName),
            isXTag = xtagRegEx.test(resourceName),
            defaultPlatform = getDefaultPlatform(config);

        if (isPolymer) {
            return 'polymer';
        }
        if (isXTag) {
            return 'xtag';
        }
        if (defaultPlatform) {
            return defaultPlatform;
        }
        return 'standard';
    }

    /**
     * Format the given module's name clearing all parsing options (!imp, Idec, !polymer, !xtag)
     * @param {string} moduleName the module's name to parse
     * @returns {string} the parsed module name
     */
    function formatModuleName(moduleName) {
        return moduleName
                .replace('!imp', '')
                .replace('!dec', '')
                .replace('!polymer', '')
                .replace('!xtag', '');
    }


    /* DECLARATIVE WAY */


    /**
     * Register web components from HTML elements.
     * @param {string} name the name of the resource to register
     * @param {object} wcPrototype the web component's prototype to register
     * @param {function} parentRequire the parent's require instance
     * @param {function} onLoad callback to handle the resource loading lifecyle (success, faillure)
     * @param {object} config the call's config
     */
    function registerHTMLElements(name, parentRequire, onLoad, config, elementNodes) {
        var moduleName,
            isPolymer = polymerRegEx.test(name),
            isXTag = xtagRegEx.test(name),
            currentPlatform = getCurrentPlatform(name, config);

        if (isDebugEnabled(config)) {
            console.log('wc', 'registerHTMLElements', 'currentPlatform', currentPlatform);
        }

        if (isPolymer) {
            moduleName = getPolymerModule(config);
        } else if (isXTag) {
            // xtag doesn't provide support for the declarative way
            moduleName = getStandardModule(config);
        } else if (currentPlatform === 'polymer') {
            // the given name doesn't contain platform option,
            // so we test if the default one is the polymer platform
            moduleName = getPolymerModule(config);
        } else {
            moduleName = getStandardModule(config);
        }

        if (moduleName) {
            parentRequire([moduleName], function () {
                // TODO: if loaded for the first time, be sure it's loaded completely
                var tags = Array.prototype.map.call(elementNodes, function (node) {
                    var div = document.createElement('div'),
                        result,
                        error;
                    div.appendChild(node);
                    if (window.CustomElements) {
                        window.CustomElements.parser.parse(div);
                        result = window[node.getAttribute('constructor')];
                    } else {
                        error = new Error('the '
                            + moduleName
                            + ' module has been loaded but CustomElements is not available');
                        onLoad.error(error);
                        throw error;
                    }
                    return result;
                });

                if (isDebugEnabled(config)) {
                    console.log('wc', 'registerHTMLElements', 'tags', tags);
                }

                onLoad(tags.length > 1 ? tags : tags[0]);
            }, function (err) {
                onLoad.error(new Error('unable to load the module [' + module + ']', err));
            });
        } else {
            onLoad.error(new Error('polymerModule and/or platformModule not configured'));
        }
    }

    /**
     * The web document is get with a declarative way
     * @param {string} name the name of the resource to register
     * @param {function} parentRequire the parent's require instance
     * @param {function} onLoad callback to handle the resource loading lifecyle (success, faillure)
     * @param {object} config the call's config
     */
    function loadDec(name, parentRequire, onLoad, config) {
        var moduleName = formatModuleName(name);

        if (isDebugEnabled(config)) {
            console.log('wc', 'declarative load of', moduleName);
        }

        parentRequire(['text!' + moduleName], function (wcStr) {
            var div = document.createElement('div'),
                elementNodes,
                importNodes,
                importedModules,
                baseImportUrl = /.*\//.exec(moduleName) || '',
                currentPlatform = getCurrentPlatform(name, config);

            div.innerHTML = wcStr;
            elementNodes = div.querySelectorAll('element');
            importNodes = div.querySelectorAll('link[rel="import"]');

            if (importNodes.length > 0) {
                importedModules = Array.prototype.map.call(importNodes, function (node) {
                    return 'wc!'
                        + baseImportUrl
                        + node.getAttribute('href')
                        + '!dec'
                        + '!' + currentPlatform;
                });

                if (isDebugEnabled(config)) {
                    console.log('wc', 'will import', importedModules);
                }

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


    /* IMPERATIVE WAY */


    /**
     * Register a standard web component, using document.register()
     * @param {string} tagName the name of the tag's to register
     * @param {object} wcPrototype the web component's prototype to register
     * @param {function} parentRequire the parent's require instance
     * @param {function} onLoad callback to handle the resource loading lifecyle (success, faillure)
     * @param {object} config the call's config
     */
    function registerStdComponent(tagName, wcPrototype, parentRequire, onLoad, config) {
        var tag, standardModule;
        if (document.register) {
            tag = document.register(tagName, wcPrototype);
            onLoad(tag);
        } else {
            standardModule = getStandardModule(config);
            if (standardModule) {
                parentRequire([standardModule], function () {

                    if (isDebugEnabled(config)) {
                        console.log('wc', 'standard platform module', standardModule, 'loaded');
                    }

                    // TODO: if loaded for the first time, be sure it's loaded completely
                    if (document.register) {
                        tag = document.register(tagName, wcPrototype);
                        onLoad(tag);
                    } else {
                        onLoad.error(new Error('no document.register'));
                    }
                }, function (err) {
                    onLoad.error(new Error('unable to load the standard platform module', err));
                });
            } else {
                onLoad.error(new Error('standardModule not configured'));
            }
        }
    }

    /**
     * Register a x-tag web component, using xtag.register()
     * @param {string} tagName the name of the tag's to register
     * @param {object} wcPrototype the web component's prototype to register
     * @param {function} parentRequire the parent's require instance
     * @param {function} onLoad callback to handle the resource loading lifecyle (success, faillure)
     * @param {object} config the call's config
     */
    function registerXTagComponent(tagName, wcPrototype, parentRequire, onLoad, config) {
        var tag,
            xTagModule = getXTagModule(config);
        if (xTagModule) {
            parentRequire([xTagModule], function (xtag) {
                // TODO: if loaded for the first time, be sure it's loaded completely
                if (isDebugEnabled(config)) {
                    console.log('wc', 'loaded xtag', xtag);
                    console.log('wc', 'register', tagName, wcPrototype);
                }
                tag = xtag.register(tagName, wcPrototype);
                onLoad(tag);
            }, function (err) {
                onLoad.error(new Error('unable to load the xtag module', err));
            });
        } else {
            onLoad.error(new Error('xTagModule not configured'));
        }
    }

    /**
     * Extract from the given resource's URL the tag's name.
     * <p/>
     * ex: <code>a/path/of/module</code> will give <code>module</code>
     * @param {string} resourceUrl the ressource's URL
     * @returns {string} the tag's name
     */
    function getElementNameFromResourceUrl(resourceUrl) {
        var index = resourceUrl.lastIndexOf('/');
        return index > -1 ? resourceUrl.substring(index + 1) : resourceUrl;
    }

    /**
     * The web document is get with an imperative way
     * @param {string} name the name of the resource to register
     * @param {object} wcPrototype the web component's prototype to register
     * @param {function} parentRequire the parent's require instance
     * @param {function} onLoad callback to handle the resource loading lifecyle (success, faillure)
     * @param {object} config the call's config
     */
    function loadImp(name, parentRequire, onLoad, config) {
        var moduleName = formatModuleName(name),
            isPolymer = polymerRegEx.test(name),
            isXTag = xtagRegEx.test(name);

        if (isDebugEnabled(config)) {
            console.log('wc', 'isPolymer', isPolymer, 'isXTag', isXTag);
            console.log('Polymer', !!window.Polymer, 'xtag', !!window.xtag);
        }

        parentRequire([moduleName], function (wcPrototype) {
            var tagName = getElementNameFromResourceUrl(moduleName);
            if (isPolymer) {
                // polymer doesn't provide support for the imperative way
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


    /* WC PLUGIN */


    wc = {
        load: function (name, parentRequire, onLoad, config) {
            var isImp = impRegEx.test(name),
                isDec = decRegEx.test(name);

            if (isDebugEnabled(config)) {
                console.log('wc', 'will load', arguments);
                console.log('wc', 'isImp', isImp, 'isDec', isDec);
            }

            if (isImp) {
                loadImp(name, parentRequire, onLoad, config);
            } else if (isDec) {
                loadDec(name, parentRequire, onLoad, config);
            } else {
                // TODO: use the module's config object to configure a default mode
                throw "no options !imp or !dec found!";
            }

        }
    };

    return wc;
});

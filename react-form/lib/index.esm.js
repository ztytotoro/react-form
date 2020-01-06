import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Subject } from 'rxjs';

var FormItemKind;
(function (FormItemKind) {
    FormItemKind["Control"] = "Control";
    FormItemKind["Group"] = "Group";
})(FormItemKind || (FormItemKind = {}));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var FormBase = /** @class */ (function () {
    function FormBase(_definition) {
        var _this = this;
        this._definition = _definition;
        this.error$ = new Subject();
        this.valueChange$ = new Subject();
        this.stateChange$ = new Subject();
        this._visible = true;
        this._isValid = true;
        this.valueChange$.subscribe(function () {
            var _a, _b;
            _this.validate();
            (_b = (_a = _this.definition).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, _this);
        });
    }
    Object.defineProperty(FormBase.prototype, "isValid", {
        get: function () {
            return this._isValid;
        },
        enumerable: true,
        configurable: true
    });
    FormBase.prototype.validate = function () {
        var _this = this;
        var _a;
        var tasks = [];
        (_a = this.validators) === null || _a === void 0 ? void 0 : _a.forEach(function (v) {
            var result = v(_this.value);
            if (result) {
                tasks.push(result);
            }
        });
        if (tasks.length > 0) {
            this._isValid = false;
            Promise.all(tasks).then(function (result) { return _this.error$.next(result); });
        }
        else {
            this._isValid = true;
        }
        this.stateChange$.next();
    };
    Object.defineProperty(FormBase.prototype, "definition", {
        get: function () {
            return this._definition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormBase.prototype, "default", {
        get: function () {
            return this.definition.default;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormBase.prototype, "kind", {
        get: function () {
            return this.definition.kind;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormBase.prototype, "validators", {
        get: function () {
            return this.definition.validators;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormBase.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        enumerable: true,
        configurable: true
    });
    FormBase.prototype.show = function () {
        this._visible = true;
        this.stateChange$.next();
    };
    FormBase.prototype.hide = function () {
        this._visible = false;
        this.stateChange$.next();
    };
    FormBase.prototype.onError = function (cb) {
        this.error$.subscribe(cb);
    };
    FormBase.prototype.onChange = function (cb) {
        var _this = this;
        this.valueChange$.subscribe(function () { return cb(_this); });
    };
    FormBase.prototype.onStateChange = function (cb) {
        this.stateChange$.subscribe(cb);
    };
    FormBase.prototype.dispose = function () {
        this.error$.unsubscribe();
        this.valueChange$.unsubscribe();
    };
    return FormBase;
}());
var FormControl = /** @class */ (function (_super) {
    __extends(FormControl, _super);
    function FormControl(name, definition, _group) {
        var _this = _super.call(this, definition) || this;
        _this.name = name;
        _this._group = _group;
        _this._value = null;
        _this._disabled = false;
        _this.reset();
        return _this;
    }
    Object.defineProperty(FormControl.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControl.prototype, "group", {
        get: function () {
            return this._group;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControl.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        enumerable: true,
        configurable: true
    });
    FormControl.prototype.enable = function () {
        this._disabled = false;
        this.stateChange$.next();
    };
    FormControl.prototype.disable = function () {
        this._disabled = true;
        this.stateChange$.next();
    };
    FormControl.prototype.setValue = function (newValue) {
        this._value = newValue;
        this.valueChange$.next();
        this.stateChange$.next();
    };
    FormControl.prototype.reset = function () {
        var _a, _b, _c;
        this.setValue((_c = (_a = this.default, (_a !== null && _a !== void 0 ? _a : (_b = this.group.default) === null || _b === void 0 ? void 0 : _b[this.name])), (_c !== null && _c !== void 0 ? _c : null)));
    };
    return FormControl;
}(FormBase));
var FormGroup = /** @class */ (function (_super) {
    __extends(FormGroup, _super);
    function FormGroup(name, definition, _group) {
        if (_group === void 0) { _group = null; }
        var _this = _super.call(this, definition) || this;
        _this.name = name;
        _this._group = _group;
        _this._controlMap = new Map();
        Object.entries(definition.controls).forEach(function (_a) {
            var name = _a[0], control = _a[1];
            if (control.kind === FormItemKind.Control) {
                _this._controlMap.set(name, new FormControl(name, control, _this));
            }
            else if (control.kind === FormItemKind.Group) {
                _this._controlMap.set(name, new FormGroup(name, control, _this));
            }
        });
        _this.controlList.forEach(function (control) {
            return control.onChange(function () { return _this.valueChange$.next(); });
        });
        _this.reset();
        return _this;
    }
    Object.defineProperty(FormGroup.prototype, "group", {
        get: function () {
            return this._group;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormGroup.prototype, "controlMap", {
        get: function () {
            return this._controlMap;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormGroup.prototype, "controls", {
        get: function () {
            var controls = {};
            this.controlMap.forEach(function (v, k) {
                controls[k] = v;
            });
            return controls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormGroup.prototype, "controlList", {
        get: function () {
            return Array.from(this.controlMap.values());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormGroup.prototype, "value", {
        get: function () {
            var value = {};
            this.controlMap.forEach(function (v, k) {
                value[k] = v.value;
            });
            return value;
        },
        enumerable: true,
        configurable: true
    });
    FormGroup.prototype.setValue = function (newValue) {
        this.controlMap.forEach(function (v, k) {
            var _a, _b;
            v.setValue((_b = (_a = newValue) === null || _a === void 0 ? void 0 : _a[k], (_b !== null && _b !== void 0 ? _b : null)));
        });
    };
    FormGroup.prototype.reset = function () {
        this.controlMap.forEach(function (v) {
            v.reset();
        });
    };
    FormGroup.prototype.enable = function () {
        this.controlMap.forEach(function (v) {
            v.enable();
        });
    };
    FormGroup.prototype.disable = function () {
        this.controlMap.forEach(function (v) {
            v.disable();
        });
    };
    FormGroup.prototype.get = function (path) {
        var _a, _b;
        if (typeof path === 'string') {
            path = path.split('.');
        }
        if (path.length > 0) {
            var name_1 = path.shift();
            var item = this.controlMap.get(name_1);
            if (((_a = item) === null || _a === void 0 ? void 0 : _a.kind) === FormItemKind.Group) {
                return item.get(path);
            }
            if (((_b = item) === null || _b === void 0 ? void 0 : _b.kind) === FormItemKind.Control) {
                return path.length > 0 ? null : item;
            }
        }
        return this;
    };
    FormGroup.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.controlList.forEach(function (control) { return control.dispose(); });
    };
    return FormGroup;
}(FormBase));

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".FormControl {\r\n    display: flex;\r\n    flex-direction: column;\r\n}\r\n\r\n.FormControlLabel {\r\n    margin-bottom: 4px;\r\n}\r\n";
styleInject(css);

// Note: this hook can cause problems when the promsie returns
function usePromise(promise) {
    var _a = useState(null), value = _a[0], setValue = _a[1];
    var _b = useState(false), done = _b[0], setDone = _b[1];
    useEffect(function () {
        promise
            .then(function (val) { return setValue(val); })
            .catch(function () { return setValue(null); })
            .finally(function () { return setDone(true); });
    });
    return [value, done];
}

var PromisedText = function (_a) {
    var textPromise = _a.textPromise;
    var text = usePromise((textPromise !== null && textPromise !== void 0 ? textPromise : Promise.resolve(null)))[0];
    return text ? React.createElement(React.Fragment, null, text) : React.createElement(React.Fragment, null);
};

var DefaultStore = /** @class */ (function () {
    function DefaultStore() {
        this.store = {};
    }
    DefaultStore.prototype.get = function (key) {
        return this.store[key];
    };
    DefaultStore.prototype.set = function (key, item) {
        this.store[key] = item;
    };
    return DefaultStore;
}());
var storeFactory = DefaultStore;
var Store = /** @class */ (function () {
    function Store(factory) {
        if (factory === void 0) { factory = storeFactory; }
        this.store = new factory();
    }
    Store.setDefaultStore = function (factory) {
        storeFactory = factory;
    };
    Store.prototype.get = function (key) {
        return this.store.get(key);
    };
    Store.prototype.set = function (key, item) {
        this.store.set(key, item);
    };
    return Store;
}());

function makeFactory() {
    var store = new Store();
    var register = function (key, value) {
        if (typeof key === 'string') {
            store.set(key, value);
        }
        else if (key instanceof Array) {
            key.forEach(function (k) {
                store.set(k, value);
            });
        }
    };
    var get = function (key) {
        if (key === null || key === undefined) {
            return null;
        }
        return store.get(key);
    };
    return [register, get];
}

var _a;
var registerControl = (_a = makeFactory(), _a[0]), getControl = _a[1];
function useControls(controls) {
    controls.forEach(function (control) {
        registerControl(control.id, control.component);
    });
}

var _a$1;
var registerGroup = (_a$1 = makeFactory(), _a$1[0]), getGroup = _a$1[1];
function useGroups(groups) {
    groups.forEach(function (group) {
        registerGroup(group.id, group.component);
    });
}

var RenderedControl = function (_a) {
    var control = _a.control;
    var Control = getControl(control.definition.type);
    var _b = useState(control.disabled), disabled = _b[0], setDisabled = _b[1];
    var _c = useState(control.value), value = _c[0], setValue = _c[1];
    var _d = useState(control.isValid), isValid = _d[0], setIsValid = _d[1];
    var _e = useState([]), errorTips = _e[0], setErrorTips = _e[1];
    useEffect(function () {
        control.onStateChange(function () {
            setDisabled(control.disabled);
            setValue(control.value);
            setIsValid(control.isValid);
        });
        control.onError(function (errorTips) { return setErrorTips(errorTips); });
    });
    if (Control) {
        var onChange = function (value) {
            if (value !== control.value) {
                control.setValue(value);
            }
        };
        return (React.createElement("div", { className: "FormControl" },
            React.createElement("label", { className: "FormControlLabel" },
                React.createElement(PromisedText, { textPromise: control.definition.label })),
            React.createElement(Control, { value: value, onChange: onChange, params: control.definition.params, disabled: disabled }),
            !isValid ? (errorTips.map(function (tip, index) { return React.createElement("label", { key: index }, tip); })) : (React.createElement(React.Fragment, null))));
    }
    console.warn('Cannot find control: ', control.definition.type);
    return React.createElement(React.Fragment, null);
};

function renderGroup(group) {
    return group.controlList.map(function (control, index) {
        var _a;
        var node;
        if (control.kind === FormItemKind.Control) {
            node = (React.createElement(RenderedControl, { key: control.name, control: control }));
        }
        else if (control.kind === FormItemKind.Group) {
            node = (React.createElement(RenderedGroup, { key: (_a = control.name, (_a !== null && _a !== void 0 ? _a : index)), group: control }));
        }
        else {
            node = React.createElement(React.Fragment, null);
        }
        return {
            groupParams: control.definition.groupParams,
            element: node,
            name: control.name
        };
    });
}
var RenderedGroup = function (_a) {
    var group = _a.group;
    var _b = useState(group.visible), visible = _b[0], setVisible = _b[1];
    useEffect(function () {
        group.onStateChange(function () { return setVisible(group.visible); });
    });
    var Group = getGroup(group.definition.type);
    if (Group) {
        return (React.createElement(Group, { controls: renderGroup(group), visible: visible, params: group.definition.params, label: group.definition.label }));
    }
    console.warn('Cannot find group: ', group.definition.type);
    return React.createElement(React.Fragment, null);
};

function setup(handle) {
    handle({
        useControls: useControls,
        useGroups: useGroups
    });
}
function makeForm(form) {
    return new FormGroup('$root', form);
}
function renderForm(formDef, container) {
    var form = makeForm(formDef);
    ReactDOM.render(React.createElement(RenderedGroup, { group: form }), container);
    return form;
}

export { FormBase, FormControl, FormGroup, FormItemKind, PromisedText, Store, renderForm, setup, useControls, useGroups };

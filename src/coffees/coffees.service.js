"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.CoffeesService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var apollo_server_express_1 = require("apollo-server-express");
var coffee_entity_1 = require("./entities/coffee.entity");
var flavor_entity_1 = require("./entities/flavor.entity");
var CoffeesService = /** @class */ (function () {
    function CoffeesService(coffeesRepository, flavorsRepository, pubSub) {
        this.coffeesRepository = coffeesRepository;
        this.flavorsRepository = flavorsRepository;
        this.pubSub = pubSub;
    }
    CoffeesService.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.coffeesRepository.find()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CoffeesService.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var coffee;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.coffeesRepository.findOne({ where: { id: id } })];
                    case 1:
                        coffee = _a.sent();
                        if (!coffee) {
                            throw new apollo_server_express_1.UserInputError("Coffee #".concat(id, " does not exist"));
                        }
                        return [2 /*return*/, coffee];
                }
            });
        });
    };
    CoffeesService.prototype.create = function (createCoffeeInput) {
        return __awaiter(this, void 0, void 0, function () {
            var flavors, coffee, newCoffeeEntity;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(createCoffeeInput.flavors.map(function (name) { return _this.preloadFlavorByName(name); }))];
                    case 1:
                        flavors = _a.sent();
                        coffee = this.coffeesRepository.create(__assign(__assign({}, createCoffeeInput), { flavors: flavors }));
                        return [4 /*yield*/, this.coffeesRepository.save(coffee)];
                    case 2:
                        newCoffeeEntity = _a.sent();
                        this.pubSub.publish('coffeeAdded', { coffeeAdded: newCoffeeEntity });
                        return [2 /*return*/, newCoffeeEntity];
                }
            });
        });
    };
    CoffeesService.prototype.update = function (id, updateCoffeeInput) {
        return __awaiter(this, void 0, void 0, function () {
            var flavors, _a, coffee;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = updateCoffeeInput.flavors;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all(updateCoffeeInput.flavors.map(function (name) { return _this.preloadFlavorByName(name); }))];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        flavors = _a;
                        return [4 /*yield*/, this.coffeesRepository.preload(__assign(__assign({ id: id }, updateCoffeeInput), { flavors: flavors }))];
                    case 3:
                        coffee = _b.sent();
                        if (!coffee) {
                            throw new apollo_server_express_1.UserInputError("Coffee #".concat(id, " does not exist"));
                        }
                        return [4 /*yield*/, this.coffeesRepository.save(coffee)];
                    case 4: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    CoffeesService.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var coffee;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findOne(id)];
                    case 1:
                        coffee = _a.sent();
                        return [4 /*yield*/, this.coffeesRepository.remove(coffee)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CoffeesService.prototype.preloadFlavorByName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var existingFlavor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.flavorsRepository.findOne({
                            where: { name: name }
                        })];
                    case 1:
                        existingFlavor = _a.sent();
                        if (existingFlavor) {
                            return [2 /*return*/, existingFlavor];
                        }
                        return [2 /*return*/, this.flavorsRepository.create({ name: name })];
                }
            });
        });
    };
    CoffeesService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(coffee_entity_1.Coffee)),
        __param(1, (0, typeorm_1.InjectRepository)(flavor_entity_1.Flavor))
    ], CoffeesService);
    return CoffeesService;
}());
exports.CoffeesService = CoffeesService;

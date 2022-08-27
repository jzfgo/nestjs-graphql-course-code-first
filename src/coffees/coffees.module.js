"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CoffeesModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var coffees_resolver_1 = require("./coffees.resolver");
var coffees_service_1 = require("./coffees.service");
var coffee_entity_1 = require("./entities/coffee.entity");
var flavor_entity_1 = require("./entities/flavor.entity");
var coffee_flavors_resolver_1 = require("./coffee-flavors.resolver");
var pub_sub_module_1 = require("../pub-sub/pub-sub.module");
var flavors_by_coffee_loader_1 = require("./data-loader/flavors-by-coffee.loader");
var CoffeesModule = /** @class */ (function () {
    function CoffeesModule() {
    }
    CoffeesModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([coffee_entity_1.Coffee, flavor_entity_1.Flavor]), pub_sub_module_1.PubSubModule],
            providers: [coffees_resolver_1.CoffeesResolver, coffees_service_1.CoffeesService, coffee_flavors_resolver_1.CoffeeFlavorsResolver, flavors_by_coffee_loader_1.FlavorsByCoffeeLoader]
        })
    ], CoffeesModule);
    return CoffeesModule;
}());
exports.CoffeesModule = CoffeesModule;

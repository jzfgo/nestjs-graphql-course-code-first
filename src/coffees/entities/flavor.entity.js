"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Flavor = void 0;
var eager_import_0 = require("./coffee.entity");
var graphql_1 = require("@nestjs/graphql");
var typeorm_1 = require("typeorm");
var coffee_entity_1 = require("./coffee.entity");
var Flavor = /** @class */ (function () {
    function Flavor() {
    }
    Flavor._GRAPHQL_METADATA_FACTORY = function () {
        return { id: { type: function () { return Number; } }, name: { type: function () { return String; } }, coffees: { type: function () { return [require("./coffee.entity").Coffee]; } } };
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        (0, graphql_1.Field)(function (type) { return graphql_1.ID; }, {
            description: 'An unique identifier'
        })
    ], Flavor.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, graphql_1.Field)(function (type) { return String; })
    ], Flavor.prototype, "name");
    __decorate([
        (0, typeorm_1.ManyToMany)(function (type) { return coffee_entity_1.Coffee; }, function (coffee) { return coffee.flavors; } /* inverse side */)
    ], Flavor.prototype, "coffees");
    Flavor = __decorate([
        (0, typeorm_1.Entity)(),
        (0, graphql_1.ObjectType)({
            description: 'Flavor model'
        })
    ], Flavor);
    return Flavor;
}());
exports.Flavor = Flavor;

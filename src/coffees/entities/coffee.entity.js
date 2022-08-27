"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Coffee = void 0;
var eager_import_0 = require("./flavor.entity");
var eager_import_1 = require("../../common/enums/coffee-type.enum");
var graphql_1 = require("@nestjs/graphql");
var typeorm_1 = require("typeorm");
var drink_interface_1 = require("../../common/interfaces/drink.interface");
var logger_middleware_1 = require("../../common/middleware/logger.middleware");
var flavor_entity_1 = require("./flavor.entity");
var Coffee = /** @class */ (function () {
    function Coffee() {
    }
    Coffee._GRAPHQL_METADATA_FACTORY = function () {
        return { id: { type: function () { return Number; } }, name: { type: function () { return String; } }, brand: { type: function () { return String; } }, flavors: { nullable: true, type: function () { return [require("./flavor.entity").Flavor]; } }, createdAt: { nullable: true, type: function () { return Date; } }, type: { nullable: true, type: function () { return require("../../common/enums/coffee-type.enum").CoffeeType; } } };
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        (0, graphql_1.Field)(function () { return graphql_1.ID; }, {
            description: 'An unique identifier'
        })
    ], Coffee.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, graphql_1.Field)(function () { return String; }, {
            middleware: [logger_middleware_1.loggerMiddleware]
        })
    ], Coffee.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, graphql_1.Field)(function () { return String; })
    ], Coffee.prototype, "brand");
    __decorate([
        (0, typeorm_1.JoinTable)(),
        (0, typeorm_1.ManyToMany)(function (type) { return flavor_entity_1.Flavor; }, function (flavor) { return flavor.coffees; } /* inverse side */, {
            cascade: true
        }),
        (0, graphql_1.Field)(function () { return [flavor_entity_1.Flavor]; })
    ], Coffee.prototype, "flavors");
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        (0, graphql_1.Field)(function () { return Date; })
    ], Coffee.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        })
    ], Coffee.prototype, "type");
    Coffee = __decorate([
        (0, typeorm_1.Entity)(),
        (0, graphql_1.ObjectType)({
            description: 'Coffee model',
            implements: function () { return drink_interface_1.Drink; }
        })
    ], Coffee);
    return Coffee;
}());
exports.Coffee = Coffee;

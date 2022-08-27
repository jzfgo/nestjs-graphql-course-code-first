"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateCoffeeInput = void 0;
var eager_import_0 = require("../../common/enums/coffee-type.enum");
var graphql_1 = require("@nestjs/graphql");
var class_validator_1 = require("class-validator");
var coffee_type_enum_1 = require("../../common/enums/coffee-type.enum");
var CreateCoffeeInput = /** @class */ (function () {
    function CreateCoffeeInput() {
    }
    CreateCoffeeInput._GRAPHQL_METADATA_FACTORY = function () {
        return { name: { type: function () { return String; } }, brand: { type: function () { return String; } }, flavors: { type: function () { return [String]; } }, type: { type: function () { return require("../../common/enums/coffee-type.enum").CoffeeType; } } };
    };
    __decorate([
        (0, class_validator_1.MinLength)(3),
        (0, graphql_1.Field)(function () { return String; }, { description: 'The name of the coffee' })
    ], CreateCoffeeInput.prototype, "name");
    __decorate([
        (0, graphql_1.Field)(function () { return String; }, { description: 'The brand of the coffee' })
    ], CreateCoffeeInput.prototype, "brand");
    __decorate([
        (0, graphql_1.Field)(function () { return [String]; }, { description: 'The flavors of the coffee' })
    ], CreateCoffeeInput.prototype, "flavors");
    __decorate([
        (0, graphql_1.Field)(function () { return coffee_type_enum_1.CoffeeType; }, { description: 'The type of the coffee' })
    ], CreateCoffeeInput.prototype, "type");
    CreateCoffeeInput = __decorate([
        (0, graphql_1.InputType)()
    ], CreateCoffeeInput);
    return CreateCoffeeInput;
}());
exports.CreateCoffeeInput = CreateCoffeeInput;

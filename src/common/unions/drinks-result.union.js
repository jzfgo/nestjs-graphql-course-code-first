"use strict";
exports.__esModule = true;
exports.DrinksResultUnion = void 0;
var graphql_1 = require("@nestjs/graphql");
var coffee_entity_1 = require("../../coffees/entities/coffee.entity");
var tea_entity_1 = require("../../teas/entities/tea.entity");
exports.DrinksResultUnion = (0, graphql_1.createUnionType)({
    name: 'DrinksResult',
    types: function () { return [coffee_entity_1.Coffee, tea_entity_1.Tea]; }
});

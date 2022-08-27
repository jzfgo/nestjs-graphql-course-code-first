"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var apollo_1 = require("@nestjs/apollo");
var common_1 = require("@nestjs/common");
var graphql_1 = require("@nestjs/graphql");
var typeorm_1 = require("@nestjs/typeorm");
var path_1 = require("path");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var coffees_module_1 = require("./coffees/coffees.module");
var date_scalar_1 = require("./common/scalars/date.scalar");
var tea_entity_1 = require("./teas/entities/tea.entity");
var drinks_resolver_1 = require("./drinks/drinks.resolver");
var pub_sub_module_1 = require("./pub-sub/pub-sub.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forRoot({
                    type: 'postgres',
                    host: 'localhost',
                    port: 5432,
                    username: 'postgres',
                    password: 'pass123',
                    database: 'postgres',
                    autoLoadEntities: true,
                    synchronize: true,
                    logging: ['query']
                }),
                graphql_1.GraphQLModule.forRoot({
                    driver: apollo_1.ApolloDriver,
                    autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
                    buildSchemaOptions: {
                        orphanedTypes: [tea_entity_1.Tea]
                    },
                    installSubscriptionHandlers: true
                }),
                coffees_module_1.CoffeesModule,
                pub_sub_module_1.PubSubModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService, date_scalar_1.DateScalar, drinks_resolver_1.DrinksResolver]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

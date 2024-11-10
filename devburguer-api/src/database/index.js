import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import configDatabase from '../config/database';

import User from '../app/models/User';
import Product from '../app/models/Product';
import Category from '../app/models/Category';


const models = [User, Product, Category];

class Database {
    constructor(){
        this.init();
        this.mongo();
    }

    init() {
        this.connection = new Sequelize('postgresql://postgres:pFoqHcsoxIknbzulkdMqrYOfZmmYdMgr@autorack.proxy.rlwy.net:46776/railway');
        models
            .map((model) => model.init(this.connection))
            .map((model) => model.associate && model.associate(
        this.connection.models));
    }

    mongo() {
        this.mongoConnection = mongoose.connect('mongodb://${{MONGO_INITDB_ROOT_USERNAME}}:${{MONGO_INITDB_ROOT_PASSWORD}}@${{RAILWAY_TCP_PROXY_DOMAIN}}:${{RAILWAY_TCP_PROXY_PORT}}');
    }
}

export default new Database();

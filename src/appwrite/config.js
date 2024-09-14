import conf from "../config/conf.js";
import { Client, Databases, Query,Storage, ID } from "appwrite";

export class DBService {
    client = new Client();
    databases ;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // document id
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        }
        catch (error) {
            console.log("Appwrite DBService :: createPost :: Error ", error)
        }
    }

    async updatePost(slug,{title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // document id
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        }
        catch (error) {
            console.log("Appwrite DBService :: updatePost :: Error ", error)
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true
        }
        catch(error) {
            console.log("Appwrite DBService :: deletePost :: Error ", error);
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
        }
        catch (error) {
            console.log("Appwrite DBService :: getPost :: Error ",error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        }
        catch(error) {
            console.log("Appwrite DBService :: getPosts :: Error ",error)
            return false;
        }
    }

    //file upload service

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        }
        catch(error) {
            console.log("Appwrite DBService :: uploadFile :: Error ",error)
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true
        }
        catch(error) {
            console.log("Appwrite DBService :: deleteFile :: Error ",error)
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId,
        )
    }

}

const service = new DBService();

export default service;
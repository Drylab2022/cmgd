export type AmplifyDependentResourcesAttributes = {
    auth: {
        cmgd: {
            IdentityPoolId: "string";
            IdentityPoolName: "string";
            UserPoolId: "string";
            UserPoolArn: "string";
            UserPoolName: "string";
            AppClientIDWeb: "string";
            AppClientID: "string";
        };
    };
    api: {
        cmgdapi: {
            ServiceName: "string";
            ClusterName: "string";
            PipelineName: "string";
            ContainerNames: "string";
            ApiName: "string";
            RootUrl: "string";
        };
    };
    hosting: {
        S3AndCloudFront: {
            Region: "string";
            HostingBucketName: "string";
            WebsiteURL: "string";
            S3BucketSecureURL: "string";
        };
    };
};

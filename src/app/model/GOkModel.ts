export class User{
    UserName :string;
    Password:string;
}

export class Product{
       ChassisSeries :string;
        ChassisNumber :string;
       NotificationId? :Number
        UserId :string;
        UploadedBy :string;
    }

    export class Notification{
        NotificationId :number;
        UserId  :string;
        ChassisId  :number;
        PendingActivityId:number;
        Status:number;
        NotificationTypeId:number;
        UpdatedTime:any;
    
    }

    export class NotificationItem{
        NotificationActivityId: string;
        ProductId : number;
    }

    export class Customchecklist{
        CheckItemId : string;
        ProductId : number;
    }
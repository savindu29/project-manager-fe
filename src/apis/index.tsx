export const APP_API_BASE_URL = "http://localhost:8000";

export type getProjectsOptions = {
    searchtext: string | "";
    size: number | null;
    page: number | null;


};

export type getEmployeesOptions = {
    searchtext: string | "";
    size: number | null;
    page: number | null;


};

export type projectStatus = {
    searchtext: string | "";
    size: number | null;
    page: number | null;


};
export type projectPriority = {
    id: number;
    name: string;
    code: string;


};

export interface EmployeeSearchResult {
    id: number;
    name: string;
    mobile: string;
    companyEmail: string;
    privateEmail: string;
    designation: string;
    specializedField: string;
};


export type RfpResources = {
    documentReference: string | null;
    description: string | null;
}


export type OutputsFromInova = {
    documentReference: string | null;
    description: string | null;
}
export type  Task = {

    taskTitle: string | null;
    taskDescription: string | null;
    date: Date | null;
    done:boolean | false;
}
export type  UpdateTask = {
    id:number;
    taskTitle: string | null;
    taskDescription: string | null;
    date: Date | null;
    done:boolean | false;
}
export type  UpdateStatusHistory = {
    id:number;
    
    description: string | null;
    date: Date | null;

}

export type  Todo = {
    notes: string | null;
    tasks: Task[] | null;

}

export type  Cost = {
    totalEffortMh: number | 0;
    quotedValue: number | 0;
    quotedRate: number | 0;
    amcValue: number | 0;
    workUnit:string | '',
    currencyUnit:string | ''
}


export type ExternalContactPerson = {
    name: string | null;
    mobile: string | null;
    fixTel: string | null;
    companyEmail: string | null;
    designation: string | null;
    description: string | null;
}

export type  IntermediateClient = {
    name: string | null;
    country: string | null | undefined;
    externalContactPerson: ExternalContactPerson | null;

}
export type  GrantClient = {
    name: string;
    country: string | null | undefined;
    isForeign: boolean;
    externalContactPerson: ExternalContactPerson | null;

}
export type Activity = {
    date:Date | null;
    description :string | null;
}
export type ProjectUpdateType ={
    
    projectStatus: number;
    priority:number;
    initiationDate: Date;
    proposalDueDate: Date | null;
    proposalSubmittedDate: Date | null;
    proposedImplementStartDate: Date | null;
    proposedImplementEndDate: Date | null;
    actualImplementationStartDate: Date | null;
    actualImplementationEndDate: Date | null;
    actualImplementationDueDate: Date | null;
    lessonsLearned: string | null;
    clarificationDiscussionDetails: string | null;
    effortEstimators: number[] | null;
    projectLead: number;
    
   
    // rfpResources: RfpResources[] | null;
    // outputsFromInova: OutputsFromInova[] | null;
    // latestActivity: Activity[] | null;
}

export type ProjectRequest = {
    name: string | null;
    priority: number | null;
    projectStatus: number;
    initiationDate: Date;
    proposalDueDate: Date | null;
    proposalSubmittedDate: Date | null;
    proposedImplementStartDate: Date | null;
    proposedImplementEndDate: Date | null;
    actualImplementationStartDate: Date | null;
    actualImplementationEndDate: Date | null;
    actualImplementationDueDate: Date | null;
    lessonsLearned: string | null;
    clarificationDiscussionDetails: string | null;
    effortEstimators: number[] | null;
    projectLead: number;
    intermediateClient: IntermediateClient | null;
    grantClient: GrantClient;
    cost: Cost | null
    todo: Todo | null;
    rfpResources: RfpResources[] | null;
    outputsFromInova: OutputsFromInova[] | null;
    latestActivity: Activity[] | null;

};

 

 

 

export const getProjectsMock = {
    projects: [
        {
        id: 1,
        ownerId: 1,
        globalId: "TEST_1",
        name: "Project X-Ray",
        description: "Project to build X-Ray machine that easily interfaces with program to identify problems",
        createDate: "2019-03-13T10:46:56",
        completeDate: "2019-04-07T22:29:02",
        dueDate: "2019-03-13T10:46:56",
        isActive: true
        },
        {
        id: 2,
        ownerId: 1,
        globalId: "0",
        name: "TEST",
        description: "TEST",
        createDate: "2019-04-03T10:15:56",
        completeDate: "0001-01-01T00:00:00",
        dueDate: "2019-04-03T15:15:00",
        isActive: true
        },
        {
        id: 3,
        ownerId: 1,
        globalId: "RMT",
        name: "ABORT RMT",
        description: "Senior project",
        createDate: "2019-04-03T23:59:52",
        completeDate: "0001-01-01T00:00:00",
        dueDate: "2019-05-06T11:00:00",
        isActive: true
        },
        {
        id: 4,
        ownerId: 1,
        globalId: "proj1",
        name: "testTree",
        description: "Testing Tree view",
        createDate: "2019-04-05T10:39:06",
        completeDate: "0001-01-01T00:00:00",
        dueDate: "2019-04-05T15:36:29",
        isActive: true
        },
        {
        id: 5,
        ownerId: 1,
        globalId: "BranchTest",
        name: "Test for Branching",
        description: "Test for Branching",
        createDate: "2019-04-06T11:33:49",
        completeDate: "0001-01-01T00:00:00",
        dueDate: "2019-04-06T16:32:48",
        isActive: true
        }
    ]
}

export const addProjectMock = {
    "id": 6,
    "ownerId": 1,
    "globalId": "MockAdd",
    "name": "Mocking",
    "description": "Mocking Description",
    "createDate": "2019-04-06T11:33:49",
    "completeDate": "0001-01-01T00:00:00",
    "dueDate": "2019-04-06T16:32:48",
    "isActive": true
    }
  
  export const editProjectMock = {
    id: 4,
    ownerId: 1,
    globalId: "proj1",
    name: "projectTest",
    description: "Testing Tree view",
    createDate: "2019-04-05T10:39:06",
    completeDate: "0001-01-01T00:00:00",
    dueDate: "2019-04-05T15:36:29",
    isActive: true
    }
  export const deleteProjectMock = {
    id: 5,
    ownerId: 1,
    globalId: "BranchTest",
    name: "Test for Branching",
    description: "Test for Branching",
    createDate: "2019-04-06T11:33:49",
    completeDate: "0001-01-01T00:00:00",
    dueDate: "2019-04-06T16:32:48",
    isActive: true
    }
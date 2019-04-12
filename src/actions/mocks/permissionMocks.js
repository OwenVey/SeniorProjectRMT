export const getProjectPermissionsMock = {
  groupPermissions: [],
  userPermissions: [
    {
      userId: 3,
      projectId: 3,
      permission: "CRM",
      endDate: "2021-04-30T11:50:43"
    },
    {
      userId: 4,
      projectId: 3,
      permission: "RMCDA",
      endDate: "2026-04-24T11:51:04"
    },
    {
      userId: 3,
      projectId: 2,
      permission: "CRD",
      endDate: "2019-04-12T16:41:24"
    }
  ]
}

export const addUserProjectPermissionMock = {
  "userId": 7,
  "projectId": 2,
  "permission": "CRM",
  "endDate": "2020-04-17T16:41:24"
}

export const editUserProjectPermissionMock = {
  "userId": 3,
  "projectId": 2,
  "permission": "CRMD",
  "endDate": "2019-04-12T16:41:24"
}

export const deletePermissionMock = {
  "userId": 3,
  "projectId": 2,
  "permission": "CRD",
  "endDate": "2019-04-12T16:41:24"
}
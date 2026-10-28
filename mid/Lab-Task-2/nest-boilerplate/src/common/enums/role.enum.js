"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleHierarchy = exports.Role = void 0;
var Role;
(function (Role) {
    Role["SUPER_ADMIN"] = "ROLE_SUPER_ADMIN";
    Role["ADMIN"] = "ROLE_ADMIN";
    Role["USER"] = "ROLE_USER";
    Role["DEPARTMENT_HEAD"] = "ROLE_DEPARTMENT_HEAD";
    Role["COURSE_CONVENOR"] = "ROLE_COURSE_CONVENOR";
    Role["THESIS_ADMIN"] = "ROLE_THESIS_ADMIN";
    Role["THESIS_CONVENER"] = "ROLE_THESIS_CONVENER";
    Role["THESIS_MEMBER"] = "ROLE_THESIS_MEMBER";
    Role["THESIS_SUPERVISOR"] = "ROLE_USER";
    Role["OPERATOR"] = "OPERATOR";
})(Role || (exports.Role = Role = {}));
// Role hierarchy key:value pairs
exports.RoleHierarchy = (_a = {},
    _a[Role.SUPER_ADMIN] = 8,
    _a[Role.ADMIN] = 7,
    _a[Role.DEPARTMENT_HEAD] = 6,
    _a[Role.COURSE_CONVENOR] = 5,
    _a[Role.THESIS_ADMIN] = 4,
    _a[Role.THESIS_CONVENER] = 3,
    _a[Role.THESIS_MEMBER] = 2,
    _a[Role.OPERATOR] = 2,
    _a[Role.USER] = 1,
    _a);

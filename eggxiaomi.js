/*
 Navicat Premium Data Transfer

 Source Server         : mi
 Source Server Type    : MongoDB
 Source Server Version : 40206
 Source Host           : 127.0.0.1:27017
 Source Schema         : eggxiaomi

 Target Server Type    : MongoDB
 Target Server Version : 40206
 File Encoding         : 65001

 Date: 15/05/2020 06:55:33
*/


// ----------------------------
// Collection structure for access
// ----------------------------
db.getCollection("access").drop();
db.createCollection("access");

// ----------------------------
// Documents of access
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("eggxiaomi");
db.getCollection("access").insert([ {
    _id: ObjectId("5eb757335e012d46a1e20d6a"),
    sort: NumberInt("100"),
    status: NumberInt("1"),
    "add_time": 1589073694149,
    "module_name": "管理员管理",
    type: NumberInt("1"),
    "action_name": "",
    url: "",
    "module_id": "0",
    description: "管理员管理模块",
    __v: NumberInt("0")
} ]);
db.getCollection("access").insert([ {
    _id: ObjectId("5eb757b75f325846d925c4f1"),
    sort: NumberInt("100"),
    status: NumberInt("1"),
    "add_time": 1589073754707,
    "module_name": "权限管理",
    type: NumberInt("1"),
    "action_name": "",
    url: "",
    "module_id": "0",
    description: "权限管理模块",
    __v: NumberInt("0")
} ]);
db.getCollection("access").insert([ {
    _id: ObjectId("5eb75caccd503548a07de281"),
    sort: NumberInt("100"),
    status: NumberInt("1"),
    "add_time": 1589074993136,
    "module_name": "管理员管理",
    type: NumberInt("2"),
    "action_name": "增加管理员",
    url: "/admin/manager/add",
    "module_id": ObjectId("5eb757335e012d46a1e20d6a"),
    description: "增加管理员-菜单",
    __v: NumberInt("0")
} ]);
db.getCollection("access").insert([ {
    _id: ObjectId("5eb75d42cd503548a07de282"),
    sort: NumberInt("100"),
    status: NumberInt("1"),
    "add_time": 1589074993136,
    "module_name": "管理员管理",
    type: NumberInt("3"),
    "action_name": "编辑管理员",
    url: "/admin/manager/edit",
    "module_id": ObjectId("5eb757335e012d46a1e20d6a"),
    description: "编辑管理员-操作",
    __v: NumberInt("0")
} ]);
db.getCollection("access").insert([ {
    _id: ObjectId("5eb760afcbc94d4a1d3816dc"),
    sort: NumberInt("100"),
    status: NumberInt("1"),
    "add_time": 1589076139494,
    "module_name": "角色管理",
    type: NumberInt("1"),
    "action_name": "",
    url: "",
    "module_id": "0",
    description: "角色管理",
    __v: NumberInt("0")
} ]);
db.getCollection("access").insert([ {
    _id: ObjectId("5eb762572f89554a845c9feb"),
    sort: NumberInt("100"),
    status: NumberInt("1"),
    "add_time": 1589076298775,
    "module_name": "角色管理",
    type: NumberInt("2"),
    "action_name": "角色列表",
    url: "/admin/role",
    "module_id": ObjectId("5eb760afcbc94d4a1d3816dc"),
    description: "角色列表-菜单",
    __v: NumberInt("0")
} ]);
db.getCollection("access").insert([ {
    _id: ObjectId("5eb7628d2f89554a845c9fec"),
    sort: NumberInt("100"),
    status: NumberInt("1"),
    "add_time": 1589076298775,
    "module_name": "角色管理",
    type: NumberInt("2"),
    "action_name": "增加角色",
    url: "/admin/role/add",
    "module_id": ObjectId("5eb760afcbc94d4a1d3816dc"),
    description: "增加角色-菜单",
    __v: NumberInt("0")
} ]);
db.getCollection("access").insert([ {
    _id: ObjectId("5eb762d72f89554a845c9fed"),
    sort: NumberInt("100"),
    status: NumberInt("1"),
    "add_time": 1589076298775,
    "module_name": "角色管理",
    type: NumberInt("3"),
    "action_name": "编辑角色",
    url: "/admin/role/edit",
    "module_id": ObjectId("5eb760afcbc94d4a1d3816dc"),
    description: "编辑角色-操作",
    __v: NumberInt("0")
} ]);
db.getCollection("access").insert([ {
    _id: ObjectId("5eb768574867284ca15dd11b"),
    sort: NumberInt("100"),
    status: NumberInt("1"),
    "add_time": 1589077641312,
    "module_name": "权限管理",
    type: NumberInt("2"),
    "action_name": "权限列表",
    url: "/admin/access",
    "module_id": ObjectId("5eb757b75f325846d925c4f1"),
    description: "权限列表-菜单",
    __v: NumberInt("0")
} ]);
db.getCollection("access").insert([ {
    _id: ObjectId("5eb768864867284ca15dd11c"),
    sort: NumberInt("100"),
    status: NumberInt("1"),
    "add_time": 1589077641312,
    "module_name": "权限管理",
    type: NumberInt("2"),
    "action_name": "增加权限",
    url: "/admin/access/add",
    "module_id": ObjectId("5eb757b75f325846d925c4f1"),
    description: "增加权限-操作",
    __v: NumberInt("0")
} ]);
db.getCollection("access").insert([ {
    _id: ObjectId("5eb9dfc03f5a2c888abf4a49"),
    sort: NumberInt("100"),
    status: NumberInt("1"),
    "add_time": 1589239566670,
    "module_name": "管理员管理",
    type: NumberInt("2"),
    "action_name": "管理员管理",
    url: "/admin/manager",
    "module_id": ObjectId("5eb757335e012d46a1e20d6a"),
    description: "管理员管理-菜单",
    __v: NumberInt("0")
} ]);
db.getCollection("access").insert([ {
    _id: ObjectId("5ebaad6070dba694429c7967"),
    sort: NumberInt("100"),
    status: NumberInt("1"),
    "add_time": 1589292292494,
    "module_name": "角色管理",
    type: NumberInt("3"),
    "action_name": "角色授权",
    url: "/admin/role/doAuth",
    "module_id": ObjectId("5eb760afcbc94d4a1d3816dc"),
    description: "角色授权-操作",
    __v: NumberInt("0")
} ]);
db.getCollection("access").insert([ {
    _id: ObjectId("5ebc7b7284fa65bcffc494aa"),
    sort: NumberInt("100"),
    status: NumberInt("1"),
    "add_time": 1589410091598,
    "module_name": "轮播图管理",
    type: NumberInt("1"),
    "action_name": "",
    url: "",
    "module_id": "0",
    description: "轮播图管理",
    __v: NumberInt("0")
} ]);
db.getCollection("access").insert([ {
    _id: ObjectId("5ebc7bb784fa65bcffc494ab"),
    sort: NumberInt("100"),
    status: NumberInt("1"),
    "add_time": 1589410091598,
    "module_name": "轮播图管理",
    type: NumberInt("2"),
    "action_name": "轮播图列表",
    url: "/admin/focus",
    "module_id": ObjectId("5ebc7b7284fa65bcffc494aa"),
    description: "轮播图列表-菜单",
    __v: NumberInt("0")
} ]);
db.getCollection("access").insert([ {
    _id: ObjectId("5ebc7bed84fa65bcffc494ac"),
    sort: NumberInt("100"),
    status: NumberInt("1"),
    "add_time": 1589410091598,
    "module_name": "轮播图管理",
    type: NumberInt("2"),
    "action_name": "增加轮播图",
    url: "/admin/focus/add",
    "module_id": ObjectId("5ebc7b7284fa65bcffc494aa"),
    description: "增加轮播图-菜单",
    __v: NumberInt("0")
} ]);
session.commitTransaction(); session.endSession();

// ----------------------------
// Collection structure for admin
// ----------------------------
db.getCollection("admin").drop();
db.createCollection("admin");

// ----------------------------
// Documents of admin
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("eggxiaomi");
db.getCollection("admin").insert([ {
    _id: ObjectId("5eb5df10fde3c22f0afdbf97"),
    status: NumberInt("1"),
    "add_time": 1588977199913,
    "is_super": NumberInt("1"),
    username: "qianlfeg",
    password: "202cb962ac59075b964b07152d234b70",
    mobile: "15858155190",
    email: "qianlfeg@gmail.com",
    "role_id": ObjectId("5eb4154e2f07d60c0a000678"),
    __v: NumberInt("0")
} ]);
db.getCollection("admin").insert([ {
    _id: ObjectId("5eb9617df2425a7af5dedd12"),
    status: NumberInt("1"),
    "add_time": 1589206336396,
    "is_super": NumberInt("0"),
    username: "qlf",
    password: "202cb962ac59075b964b07152d234b70",
    mobile: "15858155190",
    email: "805042956@qq.com",
    "role_id": ObjectId("5eb415c62f07d60c0a000679"),
    __v: NumberInt("0")
} ]);
session.commitTransaction(); session.endSession();

// ----------------------------
// Collection structure for focus
// ----------------------------
db.getCollection("focus").drop();
db.createCollection("focus");

// ----------------------------
// Documents of focus
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("eggxiaomi");
db.getCollection("focus").insert([ {
    _id: ObjectId("5ebd5a1f430814e99132e445"),
    status: NumberInt("1"),
    "add_time": 1589467335284,
    "focus_img": "/public/admin/upload/20200514/1589467679410.jpg",
    type: NumberInt("3"),
    title: "小程序",
    link: "https://www.cnbeta.com/",
    sort: NumberInt("1000"),
    __v: NumberInt("0")
} ]);
session.commitTransaction(); session.endSession();

// ----------------------------
// Collection structure for role_access
// ----------------------------
db.getCollection("role_access").drop();
db.createCollection("role_access");

// ----------------------------
// Documents of role_access
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("eggxiaomi");
db.getCollection("role_access").insert([ {
    _id: ObjectId("5ebaad6f70dba694429c7968"),
    "role_id": ObjectId("5eb415c62f07d60c0a000679"),
    "access_id": ObjectId("5eb757335e012d46a1e20d6a"),
    __v: NumberInt("0")
} ]);
db.getCollection("role_access").insert([ {
    _id: ObjectId("5ebaad6f70dba694429c7969"),
    "role_id": ObjectId("5eb415c62f07d60c0a000679"),
    "access_id": ObjectId("5eb75caccd503548a07de281"),
    __v: NumberInt("0")
} ]);
db.getCollection("role_access").insert([ {
    _id: ObjectId("5ebaad6f70dba694429c796a"),
    "role_id": ObjectId("5eb415c62f07d60c0a000679"),
    "access_id": ObjectId("5eb75d42cd503548a07de282"),
    __v: NumberInt("0")
} ]);
db.getCollection("role_access").insert([ {
    _id: ObjectId("5ebaad6f70dba694429c796b"),
    "role_id": ObjectId("5eb415c62f07d60c0a000679"),
    "access_id": ObjectId("5eb9dfc03f5a2c888abf4a49"),
    __v: NumberInt("0")
} ]);
db.getCollection("role_access").insert([ {
    _id: ObjectId("5ebaad6f70dba694429c796c"),
    "role_id": ObjectId("5eb415c62f07d60c0a000679"),
    "access_id": ObjectId("5eb757b75f325846d925c4f1"),
    __v: NumberInt("0")
} ]);
db.getCollection("role_access").insert([ {
    _id: ObjectId("5ebaad6f70dba694429c796d"),
    "role_id": ObjectId("5eb415c62f07d60c0a000679"),
    "access_id": ObjectId("5eb768574867284ca15dd11b"),
    __v: NumberInt("0")
} ]);
db.getCollection("role_access").insert([ {
    _id: ObjectId("5ebaad6f70dba694429c796e"),
    "role_id": ObjectId("5eb415c62f07d60c0a000679"),
    "access_id": ObjectId("5eb768864867284ca15dd11c"),
    __v: NumberInt("0")
} ]);
db.getCollection("role_access").insert([ {
    _id: ObjectId("5ebaad6f70dba694429c796f"),
    "role_id": ObjectId("5eb415c62f07d60c0a000679"),
    "access_id": ObjectId("5eb760afcbc94d4a1d3816dc"),
    __v: NumberInt("0")
} ]);
db.getCollection("role_access").insert([ {
    _id: ObjectId("5ebaad6f70dba694429c7970"),
    "role_id": ObjectId("5eb415c62f07d60c0a000679"),
    "access_id": ObjectId("5eb762572f89554a845c9feb"),
    __v: NumberInt("0")
} ]);
db.getCollection("role_access").insert([ {
    _id: ObjectId("5ebaad6f70dba694429c7971"),
    "role_id": ObjectId("5eb415c62f07d60c0a000679"),
    "access_id": ObjectId("5eb7628d2f89554a845c9fec"),
    __v: NumberInt("0")
} ]);
db.getCollection("role_access").insert([ {
    _id: ObjectId("5ebaad6f70dba694429c7972"),
    "role_id": ObjectId("5eb415c62f07d60c0a000679"),
    "access_id": ObjectId("5eb762d72f89554a845c9fed"),
    __v: NumberInt("0")
} ]);
db.getCollection("role_access").insert([ {
    _id: ObjectId("5ebaad6f70dba694429c7973"),
    "role_id": ObjectId("5eb415c62f07d60c0a000679"),
    "access_id": ObjectId("5ebaad6070dba694429c7967"),
    __v: NumberInt("0")
} ]);
session.commitTransaction(); session.endSession();

// ----------------------------
// Collection structure for rule
// ----------------------------
db.getCollection("rule").drop();
db.createCollection("rule");

// ----------------------------
// Documents of rule
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("eggxiaomi");
db.getCollection("rule").insert([ {
    _id: ObjectId("5eb4154e2f07d60c0a000678"),
    status: NumberInt("1"),
    "add_time": 1588859672986,
    title: "管理人员",
    description: "管理人员描述",
    __v: NumberInt("0")
} ]);
db.getCollection("rule").insert([ {
    _id: ObjectId("5eb415c62f07d60c0a000679"),
    status: NumberInt("1"),
    "add_time": 1588859672986,
    title: "网站编辑",
    description: "网站编辑描述",
    __v: NumberInt("0")
} ]);
session.commitTransaction(); session.endSession();

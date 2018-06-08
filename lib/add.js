/**
 * 添加模板
 * @author zhanghuiyun@xiaoyouzi.com
 * @description 2018.06
 */

const fs = require('fs');
const path = require('path');
const { prompt } = require('inquirer'); 
const tplPath = path.resolve(__dirname, '../template.json');
const tplJson = require(tplPath);

const questions = [
	{
		type: 'input',
		name: 'name',
		message: '模板名称',
		validate: function(val) {
			if (!val) {
				return '模板名称不为空'
			} else {
				return true;
			}		
		}
	},
	{
		type: 'input',
		name: 'description',
		message: '模板描述',
		validate: function(val) {
			if (!val) {
				return '模板名称不为空'
			} else {
				return true;
			}		
		}
	},
	{
		type: 'input',
		name: 'npm',
		message: '模板包名称，（ps: 创建项目使用这个npm包）',
		validate: function(val) {
			return true;	
		}
	},
	{
		type: 'input',
		name: 'git',
		message: '模板包git地址，（ps: 创建项目使用这个git地址）',
		validate: function(val) {
			return true;		
		}
	},
];

module.exports = function() {
	prompt(questions).then(function(data) {
		tplJson[data.name] = {};
		tplJson[data.name]['name'] = data.name;
		tplJson[data.name]['description'] = data.description;
		tplJson[data.name]['npm'] = data.npm;
		tplJson[data.name]['git'] = data.git;

		if (tplJson[data.name]['npm'] || tplJson[data.name]['git']) {
			fs.writeFile(tplPath, JSON.stringify(tplJson), 'utf-8', function(err, data) {
				if (err) {
					console.log('模板添加失败');
				} 
				console.log('模板添加成功');
			});
		} else {
			console.log('模板添加失败，npm或git填写其中一个哦!!!');
		}
	});
};
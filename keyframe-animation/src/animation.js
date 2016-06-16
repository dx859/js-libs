'use strict';

// 初始化状态
var STATE_INITIAL = 0;
// 开始状态
var STATE_START = 1;
// 停止状态
var STATE_STOP = 2;

/**
 * 帧动画库类
 */
function Animation() {
  this.taskQueue = [];
  this.index = 0;
  this.state = STATE_INITIAL;
}

/**
 * 添加一个同步任务，去预加载图片
 * @param imglist 图片数组
 */
Animation.prototype.loadImage = function(imglist) {
  
};

/**
 * 添加一个异步定时任务，通过定时改变图片的背景位置，实现帧动画
 * @param  ele dom对象
 * @param  positions 背景位置数组
 * @param  imageUrl 图片地址
 */
Animation.prototype.changePosition = function(ele, positions, imageUrl) {
  // body...
};

/**
 * 添加一个异步定时任务，通过定时改变image标签的src属性，实现帧动画
 * @param ele image标签
 * @param imglist 图片数组
 */
Animation.prototype.changeSrc = function(ele, imglist) {
  // body...
};

/**
 * 高级用法，添加一个异步定时执行任务。该任务自定义动画每帧执行的任务函数
 * @param taskFn 自定义每帧执行的任务函数
 */
Animation.prototype.enterFrame = function(taskFn) {
  // body...
};

/**
 * 添加一个同步任务，可以在上一个任务完成后执行回调函数
 * @param callback 回调函数
 */
Animation.prototype.then = function(callback) {
  // body...
};

/**
 * 开始执行任务 异步定义任务的间隔
 * @param interval [description]
 */
Animation.prototype.start = function(interval) {
  // body...
};

/**
 * 添加一个同步任务，该任务就是回退到上一个任务中，实现重复上一个任务的效果，可以实现重复次数
 * @param times 重复次数
 */
Animation.prototype.repeat = function(times) {
    
};

/**
 * 添加一个同步任务，相当于repeat()更友好的接口，无限循环上一次的任务
 */
Animation.prototype.repeatForever = function() {
  // body...
};

/**
 * 设置当前任务执行结束后到下一个任务开始前的等待时间
 * @param time 等待时长
 */
Animation.prototype.wait = function(time) {
  // body...
};

/**
 * 暂停当前异步定时任务
 */
Animation.prototype.pause = function() {
  // body...
};

/**
 * 重新执行上一次的暂停的异步任务
 */
Animation.prototype.restart = function() {
  // body...
};

/**
 * 释放资源
 */
Animation.prototype.dispose = function() {
  // body...
};
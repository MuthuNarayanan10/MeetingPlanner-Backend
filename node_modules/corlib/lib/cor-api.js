/*
 * 原生对象初始化
 * 基于单页面应用封装简单的窗口管理方法
 * ios系统状态栏沉浸式效果处理
 **/
(function (window) {
	const isPhone = !!window.navigator.userAgent.match(/\(i[^]+( U)? CPU.+Mac OS X/)
	const isAndroid = (window.navigator.userAgent.indexOf('Android') >= 0) ? true : false
	function initFun (isPc) {
		window.corNative = Object.assign(window.corNative || {}, {
			openWindow (params) {
				if (isPc) {
					window.parent.location.href = params.data
				} else {
					if (isPhone) {
						var typeIo = params.animID
						if ((params.flag == 1024 && params.animID == 0)) {
							typeIo = 1
						}
						if ((params.flag == 1024 && params.animID == 2)) {
							typeIo = 0
						}
						corWindow.open({
							name: params.name,
							data: params.data,
							animID: typeIo || 0,
							flag: params.flag || 0
						})
					} else {
						var typeAn = params.animID
						if (params.flag == 1024 && params.animID == 0) {
							typeAn = 0
						}
						if (params.flag == 1024 && params.animID == 2) {
							typeAn = 2
						}
						corWindow.open({
							name: params.name,
							data: params.data,
							animID: typeAn,
							flag: 0
						})
					}
				}
			},
			openFloatWindow () {
				if (isPc) {
					if (params.w == "auto" || params.w == "" || params.w == null || params.w == undefined) {
						var w = corJS.getWidth()
					} else {
						var w = params.w
					}
					if (params.h == "auto" || params.h == "" || params.h == null || params.h == undefined) {
						var h = corJS.getHeight() - params.y
					} else {
						var h = params.h
					}
					var iframe = document.createElement('iframe')
					iframe.id = params.name
					iframe.src = params.url
					iframe.name = params.name
					iframe.width = w
					iframe.height = h
					iframe.frameBorder = "0"
					iframe.scrolling = "yes"
					iframe.style.position = "absolute"
					iframe.style.left = params.x + "px"
					iframe.style.zIndex = "999"
					iframe.style.top = params.y + "px"
					document.documentElement.appendChild(iframe)
				} else {
					corWindow.openPopover(params)
				}
			},
			closeWindow (params) {
				if (isPc) {
					window.history.back()
				} else {
					if (params == undefined || params == null || params == "") {
						corWindow.close({
							animID: "-1",
							animDuration: "300"
						})
					} else {
						corWindow.close({
							animID: params.animID || "",
							animDuration: params.animDuration || "300"
						})
					}
				}
			},
			closeFloatWindow (name) {
				if (isPc) {
					document.getElementById(name).parentNode.removeChild(document.getElementById(name))
				} else {
					corWindow.closePopover(frameName)
				}
			}
		})
	}
	class CorJS {
		constructor () {}
		//原生组件初始化完毕
		ready (callback) {
			setTimeout(() => {
				if (window.corWidgetOne == undefined) {
					callback()
					initFun(true)
				}
			}, 800)
			window.corOnload = () => {
				if (isPhone) {
					document.getElementsByTagName("body")[0].className += " uh_ios7"
				}
				initFun(false)
				callback()
			}
		}
	}
	corJS = new CorJS()
}(window))
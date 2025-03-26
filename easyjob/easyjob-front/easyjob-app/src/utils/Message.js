const message = {
    error: (msg, callback) => {
        uni.showToast({
            title: msg,
            icon: "none",
            success: callback ? callback : null
        })
    },
    success: (msg, callback) => {
        uni.showToast({
            title: msg,
            icon: "sucess",
            success: callback ? callback : null
        })
    },
    warning: (msg, callback) => {
        uni.showToast({
            title: msg,
            icon: "none",
            success: callback ? callback : null
        })
    },
}

export default message;
const confirm = (message, okfun) => {
    uni.showModal({
        title: "确认操作",
        content: message,
        success: function (res) {
            if (res.confirm) {
                okfun()
            }
        }
    })
}
export default confirm;
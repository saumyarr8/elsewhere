self.__BUILD_MANIFEST = function(s) {
    return {
        __rewrites: {
            beforeFiles: [],
            afterFiles: [],
            fallback: []
        },
        "/": [s, "static/chunks/pages/index-d982a6e14f9f684a.js"],
        "/404": [s, "static/chunks/pages/404-73edf9c113838f57.js"],
        "/_error": ["static/chunks/pages/_error-a4ba2246ff8fb532.js"],
        sortedPages: ["/", "/404", "/_app", "/_error"]
    }
}("static/chunks/357-be7e21b3c393de44.js"), self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB();
export default {
  title: 'Vue Element Admin',

  lang: <string>'zh-cn',

  showSettings: <boolean>true,

  /**
   * @description Whether need tagsView
   */
  tagsView: <boolean>true,

  /**
   * @description Whether fix the header
   */
  fixedHeader: <boolean>true,

  /**
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: <boolean>true,

  /**
   * @type 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: <string | Array<string>>['production', 'development']
}
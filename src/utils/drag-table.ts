/*
 * @Description: table drag
 * @Author: Amber
 * @Date: 2023-03-17 23:40:16
 * @LastEditTime: 2023-03-18 02:12:16
 * @LastEditors: Amber
 */
import Sortable from 'sortablejs'

export default function initSort (className: string, tableList: any[], sortList: number[]) {
  return new Promise<Array<number>>((resolve) => {
    const table = document.querySelector(`.${  className  } .el-table__body-wrapper tbody`);
    Sortable.create(table as any, {
      ghostClass: 'sortable-ghost',
      animation: 150,
      easing: 'cubic-bezier(1, 0, 0, 1)',
      setData: function(dataTransfer) {
        // to avoid Firefox bug
        // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        dataTransfer.setData('Text', '')
      },
      // 结束拖动事件
      onEnd: ({
        newIndex,
        oldIndex
      }: any) => {
        const targetRow = tableList.splice(oldIndex, 1)[0]
        tableList.splice(newIndex, 0, targetRow)
  
        // for show the changes, you can delete in you code
        const tempIndex = sortList.splice(oldIndex, 1)[0] as number
        sortList.splice(newIndex, 0, tempIndex)

          // for return the changes
        resolve(sortList)
      },
    })
  })
}
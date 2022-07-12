import { NextPage } from "next"
import styled from "styled-components"
import { Card } from "../components/Card/Card"

interface indexProps {}

const index: NextPage<indexProps> = () => {
  return (
    <Container>
      <TopContent>
        <div className='O No1'>
          <div className='circle'>1</div>
          <div className='text'>从这里开始</div>
          <button>教程</button>
        </div>
        <div className='O No2'>
          <div className='circle'>2</div>
          <div className='text'>上传表单</div>
          <button>上传</button>
        </div>
      </TopContent>
      <BottomContent>
        <div className='topContent'>探索功能</div>
        <div className='cardList'>
          <div className='firstLine'>
            <div className='commonWidth firstLine1'>
              <Card title='总体介绍' customer={true}>
                APSU|MES 是适用于您的供应链的高级计划和调度工具。 APSU|MES
                管理您的计划流程，包括销售预测、库存计划、采购和生产计划。
                所有这些都集成在一个应用程序中。 对 Excel 电子表格感到沮丧？
                探索 APSU|MES，将您的规划流程提升到一个新的水平！
              </Card>
            </div>
            <div className='commonWidth firstLine2'>
              <Card title='探索预测' customer={true}>
                创建和管理销售预测智能时间序列 计算统计预测的分析方法 审查和
                编辑项目、客户中多个级别的预测值 和位置维度 上传外部销售预测
                查看 youtube 用例视频
              </Card>
            </div>
            <div className='commonWidth firstLine3'>
              <Card title='探索库存计划' customer={true}>
                在您的供应链中定位正确的库存水平 计算 安全库存和再订货数量
                审查采购订单和 配送订单并跟踪其状态 查看 youtube 用例视频
              </Card>
            </div>
            <div className='commonWidth firstLine4'>
              <Card title='探索生产计划' customer={true}>
                创建和管理生产计划 有限的材料和能力 由智能规划算法创建的计划
                Plan 交互式甘特图调整审查制造 订单并跟踪其状态 查看 youtube 用例
                视频
              </Card>
            </div>
          </div>
          <div className='secondedLine'>
            <div className='commonWidth secondedLine1'>
              <Card title='探索协作' customer={true}>
                共享计划并跟踪进度项目、资源、销售
                订单、采购订单、供应商……获取通知电子邮件 或活动时收件箱中的消息
                评估假设计划 通过复制场景
              </Card>
            </div>
            <div className='commonWidth secondedLine2'>
              <Card title='探索集成' customer={true}>
                将 APSU|MES 与您的 IT 系统集成 以 CSV 格式导入数据文件 或 Excel
                格式 将计划结果导出为 CSV 和 Excel 文件 探索 REST API 了解 odoo
                连接器
              </Card>
            </div>
            <div className='commonWidth secondedLine3'>
              <Card title='探索定制' customer={true}>
                根据您的需求定制应用程序设置您自己的偏好 和每个屏幕的收藏夹 使用
                SQL 添加自定义报告 查询了解如何在 NodeJs 中创建扩展应用程序
              </Card>
            </div>
            <div className='commonWidth secondedLine4'>
              <Card title='文档' customer={true}>
                那里有更多的信息！ 完全的 文档 访问用户论坛 在linkedin上关注我们
              </Card>
            </div>
          </div>
        </div>
      </BottomContent>
    </Container>
  )
}

export default index

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background: #ffffff;
`
const TopContent = styled.div`
  padding: 15px 0px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 31.85vh;
  background-color: #fafafc;
  user-select: none;
  button {
    margin-top: 20px;
    box-sizing: border-box;
    padding: 10px 16px;
    background-color: #0066cc;
    border: 1px solid #2e6da4;
    color: #ffffff;
    border-radius: 6px;
    font-size: 18px;
    line-height: 1.3333333em;
    cursor: pointer;
    :active {
      box-shadow: inset 0px 3px 5px rgb(0, 0, 0, 0.13);
    }
    :hover {
      background-color: #cc6600;
      border: 1px solid black;
    }
  }
  .text {
    margin: 10px 0px 0px 0;
    font-size: 30px;
    font-weight: 500;
  }
  .circle {
    margin: 10px 0 9px 0;
    font-size: 30px;
    border-radius: 50%;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 40px;
    border: 10px solid #353740;
    user-select: none;
  }
  .O {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 0 15px;
    box-sizing: border-box;
    color: #353740;
    width: 33.51vw;
  }
`
const BottomContent = styled.div`
  padding: 18px 15px 0px 15px;
  box-sizing: border-box;
  background: #ffffff;
  color: #333333;
  .commonWidth {
    width: 100%;
  }
  .firstLine {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    column-gap: 25px;
    .firstLine1 {
      height: 205px;
    }
    .firstLine2 {
      height: 205px;
    }
    .firstLine3 {
      height: 158.81px;
    }
    .firstLine4 {
      height: 186.38px;
    }
  }
  .secondedLine {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    column-gap: 25px;
    .secondedLine1 {
      height: 180.95px;
    }
    .secondedLine2 {
      height: 167.81px;
    }
    .secondedLine3 {
      height: 143.83px;
    }
    .secondedLine4 {
      height: 140.25px;
    }
  }
  .cardList {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    row-gap: 20px;
  }
  .topContent {
    margin: 0px 0px 9px 0;
    box-sizing: border-box;
  }
`

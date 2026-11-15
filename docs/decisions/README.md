# Architecture Decision Records

ADR 记录影响系统结构、技术路线、接口契约、安全边界或长期维护成本的重要决策。

## Index
| ID | Title | Status | Date |
|---|---|---|---|
| [0001](0001-no-framework-static-generator.md) | 使用无框架 Node 脚本生成静态站点 | Accepted | 2026-11-14 |

## When to write
- 引入或替换关键技术、存储、消息系统或框架；
- 改变服务边界、数据所有权、身份模型或信任边界；
- 选择具有长期兼容性影响的 API / 协议；
- 重要的安全、可靠性或成本取舍。

普通实现细节不需要 ADR。状态：Proposed → Accepted → Superseded / Deprecated / Rejected。已接受决策不应被覆盖抹除；新决策创建新 ADR 并链接旧记录。

使用 [ADR template](../templates/adr.md)，文件名：`NNNN-short-title.md`。

import { Client } from "@notionhq/client";
import env from '@config/env';

let notion = new Client({
    auth: env.NEXT_NOTION_TOKEN,
});;

export const initializeNotionClient = (notionToken) => {
    notion = new Client({
        auth: notionToken,
    });
}

export const updateDatabase = async (databaseId) => {
    const res = await notion.databases.update({
        database_id: databaseId,
        properties: {
            Name: {
                title: {}
            },
            Description: {
                rich_text: {}
            },
            Date: {
                date: {}
            }
        }
    })
}

export const getDatabase = async (databaseId) => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  return response.results;
};

export const getLocalDatabase = async () => {
    const response = await notion.databases.query({
      database_id: env.NEXT_NOTION_DATABASE_ID,
    });
    return response.results;
  };

export const getPage = async (pageId) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

export const getBlocks = async (blockId) => {
  const blocks = [];
  let cursor;
  while (true) {
    const { results, next_cursor } = await notion.blocks.children.list({
      start_cursor: cursor,
      block_id: blockId,
    });
    blocks.push(...results);
    if (!next_cursor) {
      break;
    }
    cursor = next_cursor;
  }
  return blocks;
};

const buildExerciseTableColumns = () => {
    const columns = ["Exercise", "Description", "Sets", "Reps", "Weights"];
    const formattedColumns = [];
    columns.forEach((col) => {
        formattedColumns.push([
            {
                type: "text",
                text: {
                    content: col,
                    link: null
                },
                annotations: {
                    bold: false,
                    italic: false,
                    strikethrough: false,
                    underline: false,
                    code: false,
                    color: "default"
                  },
                  plain_text: col,
                  href: null
            }
        ])
    })
    return formattedColumns
}

const linkToCover = (title) => {
    if(title.includes("leg")) {
        return "https://i.redd.it/6ifxch8p1hp21.jpg"
    } else if (title.includes('chest')) {
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkWo4JzFgGPAXqGAdCjvTkjZ65L3o-yIOSIg&usqp=CAU"
    } else if (title.includes("back")) {
        return "https://live.staticflickr.com/3257/2634532266_ed56392fe3_z.jpg"
    } else if (title.includes("shoulder")) {
        return "https://i.ytimg.com/vi/M7jW0DB0Akc/maxresdefault.jpg"
    } else if (title.includes('arm') || title.includes("bi") || title.includes("tri")) {
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl0LpgC58AQqLrqgRt4iE44l0a-LbbCCKE1SPv51VsUuTsghbXn2ZZogQKSi2jTkTS1IA&usqp=CAU"
    }
    return "https://www.bodybuilding.com/images/2021/june/how-arnold-built-his-shoulders-and-arms-header-830x467.jpg"
};

const emojisToBodyPart = (title) => {
    if (title.includes('leg')) {
        return "🦵"
    } else if (title.includes('arm') || title.includes("bi") || title.includes("tri")) {
        return "💪"
    }
    return "🏋️"

}

export const insertLogIntoBlock = async (data) => {
    let cellBlocks = [];
    const rows = [];
    const columnLength = Object.entries(data.exercises[0]).length;
    data.exercises.forEach((ex) => {
        Object.entries(ex).forEach((ex) => {
            cellBlocks.push([
                {
                    type: "text",
                    text: {
                        content: ex[1],
                        link: null
                    },
                    annotations: {
                        bold: false,
                        italic: false,
                        strikethrough: false,
                        underline: false,
                        code: false,
                        color: "default"
                      },
                      plain_text: ex[1],
                      href: null
                }
            ])
        });
        rows.push(
            {
                type: "table_row",
                table_row: {
                    cells: cellBlocks
                }
            }
        );
        cellBlocks = [];
    });

    const page = await notion.pages.create({
        parent: {
            database_id: env.NEXT_NOTION_DATABASE_ID,
        },
        icon: {
            type: "emoji",
            emoji: "🦵"
        },
        cover: {
            type: "external",
            external: {
                url: linkToCover(data.title.toLowerCase().trim())
          }
        },
        properties: {
            Name: {
                title: [
                    {
                        text: {
                            content: data.title
                        }
                    }
                ]
            },
            Description: {
                rich_text: [
                    {
                        text: {
                            content: data.description
                        }
                    }
                ]
            },
            Date: {
                date: {
                    start: data.date
                }
            }
        },
        children: [
            {
                object: "block",
                type: "table",
                table: {
                    table_width: columnLength,
                    has_column_header: true,
                    has_row_header: false,
                    children: [
                        {
                            type: "table_row",
                            table_row: {
                                cells: buildExerciseTableColumns()
                            }
                        },        
                        ...rows
                    ]
                }

            }
        ]
    });

};

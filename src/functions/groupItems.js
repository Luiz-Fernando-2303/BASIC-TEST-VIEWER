const getActiveDbids = async (viewer) => {
  return new Promise((resolve, reject) => {
    try {
      const dbIds = [];
      viewer.model.getObjectTree((tree) => {
        if (!tree) {
          reject("Erro: A árvore de objetos não foi carregada.");
          return;
        }

        tree.enumNodeChildren(
          tree.getRootId(),
          (dbId) => {
            dbIds.push(dbId);
          },
          true
        );

        if (dbIds.length === 0) {
          console.warn("Nenhum dbId encontrado na árvore do modelo.");
        }

        resolve(dbIds);
      });
    } catch (error) {
      reject("Erro ao obter dbIds: " + error);
    }
  });
};

const processDbids = async (dbIds, viewer, filter) => {
  console.log(`Iniciando o processamento de ${dbIds.length} dbIds...`);

  const chunkSize = 100;
  const chunks = Math.ceil(dbIds.length / chunkSize);
  const promises = [];

  for (let i = 0; i < chunks; i++) {
    const start = i * chunkSize;
    const end = Math.min(dbIds.length, (i + 1) * chunkSize);
    const chunk = dbIds.slice(start, end);

    console.log(
      `Processando chunk ${i + 1} de ${chunks}, dbIds de ${start} a ${end}...`
    );

    promises.push(
      new Promise((resolve) => {
        const properties = {};

        for (const dbId of chunk) {
          viewer.model.getProperties(dbId, (props) => {
            if (!props || !props.properties) {
              console.warn(`Nenhuma propriedade encontrada para dbId ${dbId}`);
              return;
            }

            for (const prop of props.properties) {
              const { category, field } = filter;

              if (
                (prop.displayCategory === category ||
                  prop.category === category) &&
                (prop.displayName === field || prop.name === field)
              ) {
                const fieldValue =
                  prop.displayValue || prop.value || "Desconhecido";

                if (!properties[fieldValue]) {
                  properties[fieldValue] = [];
                }

                properties[fieldValue].push(dbId);
                console.log();
              }
            }

            if (Object.keys(properties).length === chunk.length) {
              console.log(`Chunk ${i + 1} processado com sucesso.`);
              resolve(properties);
            }
          });
        }
      })
    );
  }

  return Promise.all(promises).then((results) => {
    const groupedData = {};

    for (const result of results) {
      Object.assign(groupedData, result);
    }

    console.log(`Processamento de todos os chunks concluído. Resultados:`);
    console.log(groupedData);

    return groupedData;
  });
};

async function groupItemsByProperties(viewer, filter) {
  if (!viewer || !viewer.model) {
    throw new Error("Viewer não está carregado.");
  }

  console.log("Agrupando itens...");

  filter = filter || { category: "Item", field: "Layer" };

  const dbIds = await getActiveDbids(viewer);
  const groupedData = await processDbids(dbIds, viewer, filter);
  return groupedData;
}

export { groupItemsByProperties };

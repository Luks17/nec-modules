export const sections = [
  {
    label: "Motivo da Solicitação",
    items: ["tipo_problema", "descricao_problema"] as const,
  },
  {
    label: "Auxílio Solicitado",
    items: [
      "tipo_auxilio",
      "qtd_cestas_basica",
      "vl_auxilio_medicamento",
      "qtd_vagas_creche",
      "qtd_vagas_escola",
    ] as const,
  },
];

const nomesObrigatorias = ['PORT', 'DB_HOST', 'DB_PORT', 'DB_USER', 'DB_NAME'];
//DB_PASS: ficará de fora, pois como usamos o xampp, ou mysql sem configuração de segurança e a senha é ("")

export function carregarAmbiente(arquivoDeConfiguracao){
    if (arquivoDeConfiguracao) {
        try {
            process.loadEnvFile(arquivoDeConfiguracao);
        } catch {
            throw new Error(`Arquivo de configuração não encontrado: ${arquivoDeConfiguracao}`)
        }
    }
    const ausentes = nomesObrigatorias.filter((nome)=>{
        const valor = process.env[nome];
        return typeof valor !== 'string' || valor.trim() === '';
    });
    if(ausentes.length > 0) {
        throw new Error(`Configure no .env: ${ausentes.join(', ')}`);
    }
    return {
        nomeAluno: process.env.NOME_ALUNO,
        turma: process.env.TURMA,
        porta: process.env.PORTA,
        ambiente: process.env.NODE_ENV || 'development'
    }
}
export function exibirDiagnostico(configuracao) {
    console.table({
        estudante: configuracao.nome,
        turma: configuracao.turma,
        projeto: 'api-projetos',
        ambiente: configuracao.ambiente,
        node: process.version,
        sistema: `${process.plataform} ${process.arch}`,
        diretorio: process.cwd(),
        portaConfigurada: configuracao.porta
    })
}
import '../css/Main/Main_sobre.css';

const Sobre = () => {
    return ( 
        <article className="sobre-arcano-page">
            <header className="arcano-header">
                <h1>A Jornada da Arcano Store: Mais que um E-commerce, uma Lenda.</h1>
                <p>Nossa história começa com a paixão por transformar o ordinário em extraordinário. Na Arcano, acreditamos que a magia está nos detalhes.</p>
            </header>

            <section className="arcano-section arcanos-origem">
                <h2>A Origem da Magia</h2>
                <p>
                    A **Arcano Store** nasceu em 2025 de um sonho ambicioso: criar um destino único para produtos que carregam significado, arte e uma aura de mistério. 
                    Lançada por Rubens Neto e Luster Clauber, a loja começou como um pequeno projeto de nicho focado em [Ex: Blog anime]. 
                    Rapidamente, a qualidade e a curadoria dos nossos itens nos destacaram, transformando a Arcano em um portal onde clientes buscam não apenas produtos, mas sim peças com história e poder. 
                    Hoje, somos um farol para aqueles que apreciam a Cultura Geek, o **único** e o **misticismo elegante**.
                </p>
            </section>

            <section className="arcano-section arcanos-missao">
                <h2>Nossa Missão: Conectar o Mundo.</h2>
                <div className="missao-bloco">
                    <p>
                        A missão central da Arcano Store é ser a **ponte entre a tradição do geek e o apoiar o cliente**. Fazemos isso através de uma curadoria rigorosa que garante que cada item em nosso catálogo tenha uma história autêntica e seja fabricado de forma **ética e sustentável**. 
                        Nós oferecemos:
                    </p>
                    <ul>
                        <li><strong>Produtos Exclusivos:</strong> Peças raras e colecionáveis que você não encontra em grandes varejistas.</li>
                        <li><strong>Qualidade Inquestionável:</strong> Foco em acabamento impecável.</li>
                        <li><strong>Experiência Encantadora:</strong> Desde a navegação no site até o unboxing do produto.</li>
                    </ul>
                </div>
            </section>

            <section className="arcano-section arcanos-valores">
                <h2>Os Pilares Arcanos: Nossos Valores Essenciais</h2>
                <p className="valores-introducao">Guiamos todas as nossas decisões por três grandes arcanos que definem quem somos:</p>
                
                <div className="valores-grid">
                    <div className="valor-card">
                        <h3>1. Curadoria e Autenticidade</h3>
                        <p>Nós não vendemos tudo. Vendemos o melhor. Cada item é inspecionado e escolhido a dedo por nossa equipe de especialistas para garantir sua **originalidade e procedência**.</p>
                    </div>
                    <div className="valor-card">
                        <h3>2. Respeito e Sustentabilidade</h3>
                        <p>A magia deve ser gentil com o mundo. Priorizamos fornecedores que praticam o comércio justo e utilizam **materiais de fontes renováveis ou recicladas**, minimizando nosso impacto ambiental.</p>
                    </div>
                    <div className="valor-card">
                        <h3>3. O Poder da Comunidade</h3>
                        <p>A Arcano é um refúgio. Construímos uma comunidade vibrante de entusiastas, artistas e colecionadores, promovendo a troca de conhecimento e a celebração da **diversidade cultural** e espiritual.</p>
                    </div>
                </div>
            </section>

            <section className="arcano-section arcanos-futuro">
                <h2>O Futuro nos Chama</h2>
                <p>
                    Olhamos para o futuro com a mesma curiosidade e reverência ao passado. Nossa meta é expandir nosso catálogo de **parcerias com artesãos globais** e investir em tecnologia para tornar a experiência de compra ainda mais imersiva e personalizada. 
                    Junte-se a nós nesta busca pelo que é raro e verdadeiro. Na Arcano Store, **o mistério nunca sai de moda.**
                </p>
            </section>
        </article>
    );
};

export default Sobre;
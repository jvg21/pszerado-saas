export const WelcomeScreen = () => {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Respostas Rápidas",
      description: "Obtenha respostas instantâneas para suas perguntas"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "IA Inteligente",
      description: "Powered by advanced AI technology"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Seguro & Privado",
      description: "Suas conversas são mantidas em segurança"
    }
  ];

  // const suggestions = [
  //   "📝 Ajude-me a escrever um email profissional",
  //   "💡 Explique um conceito complexo de forma simples",
  //   "🔍 Faça uma pesquisa sobre um tópico específico",
  //   "✨ Gere ideias criativas para um projeto"
  // ];

  return (
    <div className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Logo/Icon */}
        <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
            />
          </svg>
        </div>

        {/* Welcome Text */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Seja Bem-vindo ao Laboratório do PS Zerado
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Sua assistente de IA está pronta para ajudar. 
          Selecione uma conversa existente na barra lateral ou crie uma nova para começar.
        </p>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Suggestions */}
        {/* <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            💡 Sugestões para começar:
          </h2>
          <div className="grid gap-3">
            {suggestions.map((suggestion, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg p-4 text-left shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group"
              >
                <p className="text-gray-700 group-hover:text-blue-700 transition-colors">
                  {suggestion}
                </p>
              </div>
            ))}
          </div>
        </div> */}

        {/* CTA */}
        <div className="mt-12 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-2">
            Pronto para começar?
          </h3>
          <p className="text-gray-600 mb-4">
            Clique em "Nova conversa" na barra lateral para criar seu primeiro chat.
          </p>
          <div className="flex items-center justify-center gap-2 text-blue-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="font-medium">Nova conversa</span>
          </div>
        </div>
      </div>
    </div>
  );
};
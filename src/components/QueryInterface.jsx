// import { useState } from 'react';
// import { api } from '../api/client';
// import ReactMarkdown from 'react-markdown';

// const QueryInterface = () => {
//   const [query, setQuery] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [conversations, setConversations] = useState([]);
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!query.trim() || loading) return;

//     setLoading(true);
//     setError(null);

//     const userMessage = { type: 'user', content: query };
//     setConversations((prev) => [...prev, userMessage]);

//     try {
//       const response = await api.queryDocuments(query);

//       const aiMessage = {
//         type: 'assistant',
//         content: response.answer,
//         sources: response.sources,
//         timestamp: response.timestamp,
//       };
//       setConversations((prev) => [...prev, aiMessage]);

//       setQuery('');
//     } catch (err) {
//       setError(err.response?.data?.detail || 'Query failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearConversation = () => {
//     setConversations([]);
//     setError(null);
//   };

//   return (
//     <div className="w-full max-w-4xl mx-auto p-6 bg-white min-h-screen">
//       <div className="mb-6 flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-gray-800">
//           Ask Questions
//         </h2>
//         {conversations.length > 0 && (
//           <button
//             onClick={clearConversation}
//             className="text-sm text-gray-600 hover:text-gray-800"
//           >
//             Clear Chat
//           </button>
//         )}
//       </div>

//       {/* Conversation History */}
//       <div className="mb-6 space-y-4 min-h-[400px] max-h-[600px] overflow-y-auto">
//         {conversations.length === 0 ? (
//           <div className="text-center py-12 text-gray-500">
//             <svg
//               className="mx-auto h-12 w-12 mb-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//               />
//             </svg>
//             <p>Start by asking a question about your documents</p>
//           </div>
//         ) : (
//           conversations.map((msg, index) => (
//             <div
//               key={index}
//               className={`flex ${
//                 msg.type === 'user' ? 'justify-end' : 'justify-start'
//               }`}
//             >
//               <div
//                 className={`max-w-3xl rounded-lg p-4 ${
//                   msg.type === 'user'
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-gray-100 text-gray-800'
//                 }`}
//               >
//                 {msg.type === 'user' ? (
//                   <p>{msg.content}</p>
//                 ) : (
//                   <>
//                     <div className="prose prose-sm max-w-none">
//                       <ReactMarkdown>{msg.content}</ReactMarkdown>
//                     </div>
                    
//                     {msg.sources && msg.sources.length > 0 && (
//                       <div className="mt-4 pt-4 border-t border-gray-300">
//                         <p className="text-xs font-semibold text-gray-600 mb-2">
//                           Sources:
//                         </p>
//                         <div className="space-y-2">
//                           {msg.sources.map((source, idx) => (
//                             <div
//                               key={idx}
//                               className="text-xs bg-white p-2 rounded border border-gray-200"
//                             >
//                               <div className="flex items-start justify-between">
//                                 <div className="flex-1">
//                                   <p className="font-medium text-gray-800">
//                                     {source.filename}
//                                   </p>
//                                   <p className="text-gray-600 mt-1">
//                                     {source.chunk_text}
//                                   </p>
//                                 </div>
                                
//                                   href={source.blob_url}
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                   className="ml-2 text-blue-600 hover:text-blue-800"
//                                 >
//                                   <svg
//                                     className="h-4 w-4"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     viewBox="0 0 24 24"
//                                   >
//                                     <path
//                                       strokeLinecap="round"
//                                       strokeLinejoin="round"
//                                       strokeWidth={2}
//                                       d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
//                                     />
//                                   </svg>
//                                 </a>
//                               </div>
//                               <p className="text-gray-500 mt-1">
//                                 Relevance: {(source.score * 100).toFixed(1)}%
//                               </p>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             </div>
//           ))
//         )}

//         {loading && (
//           <div className="flex justify-start">
//             <div className="bg-gray-100 rounded-lg p-4">
//               <div className="flex space-x-2">
//                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
//                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {error && (
//         <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
//           <p className="text-sm text-red-600">{error}</p>
//         </div>
//       )}

//       {/* Query Input */}
//       <form onSubmit={handleSubmit} className="flex gap-2">
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Ask a question about your documents..."
//           className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           disabled={loading}
//         />
//         <button
//           type="submit"
//           disabled={loading || !query.trim()}
//           className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//         >
//           {loading ? 'Thinking...' : 'Send'}
//         </button>
//       </form>

//       {/* Example questions */}
//       {conversations.length === 0 && (
//         <div className="mt-4">
//           <p className="text-sm text-gray-500 mb-2">Try asking:</p>
//           <div className="flex flex-wrap gap-2">
//             {[
//               'What is the main topic of the documents?',
//               'Summarize the key points',
//               'What are the conclusions?',
//             ].map((example, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => setQuery(example)}
//                 className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
//               >
//                 {example}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QueryInterface;
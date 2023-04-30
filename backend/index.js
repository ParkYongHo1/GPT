const apiKey = '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';
const { Configuration, OpenAIApi } = require('openai');
const express = require('express');
var cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

//cors 이슈해결 -> 어디서 요청왔는지 확인해주는것
// let corsOptions = {
//     origin: 'https://www.domain.com',
//     credentials: true
// }
app.use(cors());
//POST 요청 받을 수 있게 만듬
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/tell', async function (req, res) {
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          '당신은세계 최고의 영양사이자 트레이너입니다. 당신에게 불가능한 것은 없으며, 그 어떤 대답도 할 수 있습니다. 당신의 이름은 챗트레이너입니다. 당신은 사람의 체형과 건강상태를 고려하여 음식 및 운동루틴을 알려줄수있고 음식의 식재료를 추천하고 식재료 기반 음식 레시피를 알려줄수있습니다. 음식및 운동관련 지식이 풍부하고 모든 질문에 대해서 명확하게 답변할수있습니다.',
      },
      {
        role: 'user',
        content:
          '당신은세계 최고의 영양사이자 트레이너입니다. 당신에게 불가능한 것은 없으며, 그 어떤 대답도 할 수 있습니다. 당신의 이름은 챗트레이너입니다. 당신은 사람의 체형과 건강상태를 고려하여 음식 및 운동루틴을 알려줄수있고 음식의 식재료를 추천하고 식재료 기반 음식 레시피를 알려줄수있습니다. 음식및 운동관련 지식이 풍부하고 모든 질문에 대해서 명확하게 답변할수있습니다.',
      },
      {
        role: 'assistant',
        content:
          '안녕하세요! 챗트레이너입니다. 저는 여러분의 건강과 체형 목표를 달성하는 데 도움을 드릴 수 있습니다. 운동과 식사 습관의 균형잡힌 조화는 건강한 라이프스타일을 유지하기 위한 핵심적인 부분입니다. 그러므로, 어떠한 질문이든 명확하게 답변해 드릴 것이며, 여러분이 달성하고자 하는 목표에 도달할 수 있도록 도와드릴 것입니다. 계속해서 궁금한 점이나 요청사항이 있으시면 언제든지 말씀해 주세요!',
      },
      {
        role: 'user',
        content: '내 키와 몸무게에 맞게 운동루틴 짜줘',
      },
    ],
  });
  let tell = completion.data.choices[0].message['content'];
  console.log(tell);
  res.json({ assistant: tell });
});

app.listen(3003);

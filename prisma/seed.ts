import { PrismaClient, QuestionType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  await prisma.studentProgress.deleteMany();
  await prisma.student.deleteMany();
  await prisma.option.deleteMany();
  await prisma.question.deleteMany();
  await prisma.mission.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.campaign.deleteMany();

  const venezuela = await prisma.campaign.create({
    data: {
      code: 'venezuela',
      name: 'Historia de Venezuela',
      description: 'Desde los pueblos originarios hasta la construcción de la República Bolivariana.',
      coverImageUrl: 'https://example.com/flags/venezuela.png',
    },
  });

  const vzPrecolombino = await prisma.chapter.create({
    data: {
      campaignId: venezuela.id,
      code: 'precolombino',
      name: 'Pueblos originarios',
      dateRange: 'Antes de 1498',
      description: 'Los pueblos indígenas que habitaron el territorio venezolano.',
      orderIndex: 1,
    },
  });

  const missionPueblosIndigenas = await prisma.mission.create({
    data: {
      chapterId: vzPrecolombino.id,
      code: 'pueblos_indigenas',
      title: 'Pueblos indígenas de Venezuela',
      objective: 'Reconocer algunos pueblos originarios y su forma de vida.',
      introText: 'Antes de la llegada de los europeos, en el territorio que hoy llamamos Venezuela vivían muchos pueblos como los Caribes, Arawak, Timoto-Cuicas y otros.',
      outroText: 'Has conocido algunos de los pueblos que habitaron estas tierras.',
      difficulty: 1,
      orderIndex: 1,
    },
  });

  const q1 = await prisma.question.create({
    data: {
      missionId: missionPueblosIndigenas.id,
      questionType: QuestionType.multiple_choice,
      prompt: '¿Cuál de estos fue un pueblo indígena que habitó el territorio venezolano?',
      correctFeedback: '¡Muy bien! Los Caribes fueron uno de los pueblos originarios de estas tierras.',
      incorrectFeedback: 'Revisa la información: los pueblos como los Caribes, los Arawak y los Timoto-Cuicas vivían en el territorio venezolano.',
      orderIndex: 1,
    },
  });

  await prisma.option.createMany({
    data: [
      { questionId: q1.id, text: 'Caribes', isCorrect: true, orderIndex: 1 },
      { questionId: q1.id, text: 'Sumerios', isCorrect: false, orderIndex: 2 },
      { questionId: q1.id, text: 'Vikingos', isCorrect: false, orderIndex: 3 },
      { questionId: q1.id, text: 'Japoneses', isCorrect: false, orderIndex: 4 },
    ],
  });

  const q2 = await prisma.question.create({
    data: {
      missionId: missionPueblosIndigenas.id,
      questionType: QuestionType.true_false,
      prompt: 'Los pueblos indígenas de Venezuela vivían todos de la misma manera y tenían la misma cultura.',
      correctBool: false,
      correctFeedback: 'Exacto. Había mucha diversidad: no todos vivían igual ni tenían la misma cultura.',
      incorrectFeedback: 'No todos vivían igual. Había gran diversidad de pueblos y formas de vida.',
      orderIndex: 2,
    },
  });

  console.log('✅ Seed completado');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

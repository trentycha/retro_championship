const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const userStatus = await prisma.userStatus.createMany({
    data: [
      {label: 'Gamer'},
      {label: 'Admin'},
    ],
    skipDuplicates: true,
  });
  console.log('Created user status:', userStatus);

  const license = await prisma.license.createMany({
    data: [
      {name: 'Pacman'},
      {name: 'Tetris'},
      {name: 'Pong'},
      {name: 'Sonic'},
    ],
    skipDuplicates: true,
  });
  console.log('Created license:', license);

  const typeGame = await prisma.typeGame.createMany({
    data: [
      {name: 'Fighting'},
      {name: 'Points'},
    ],
    skipDuplicates: true,
  });
  console.log('Created typeGame:', typeGame);

  const matchStatus = await prisma.matchStatus.createMany({
    data: [
      {label: 'Waiting'},
      {label: 'In Progress'},
      {label: 'Over'},
    ],
    skipDuplicates: true,
  });
  console.log('Created match status:', matchStatus);

  const tournamentStatus = await prisma.tournamentStatus.createMany({
    data: [
      {label: 'Waiting'},
      {label: 'In Progress'},
      {label: 'Over'},
    ],
    skipDuplicates: true,
  });
  console.log('Created tournament status:', tournamentStatus);

  const channel = await prisma.channel.createMany({
    data: [
      {label: 'Room 1'},
      {label: 'Room 2'},
      {label: 'Room 3'},
      {label: 'Room 4'},
      {label: 'Room 5'},
      {label: 'Room 6'},
      {label: 'Room 7'},
      {label: 'Room 8'},
      {label: 'Room 9'},
    ],
    skipDuplicates: true,
  });
  console.log('Created channel:', channel);

}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Ok !');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
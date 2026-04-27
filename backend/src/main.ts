import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));

  const config = new DocumentBuilder()
    .setTitle('Secure Notes API')
    .setDescription('API de notes personnelles sécurisées')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      validatorUrl: null, // Désactive le validateur externe (qui ralentit souvent le chargement local)
      docExpansion: 'none', // Garde les contrôleurs repliés par défaut pour accélérer le rendu
      filter: true, // Ajoute une barre de recherche pratique
    },
  });
  await app.listen(process.env.PORT as string);
}

bootstrap();
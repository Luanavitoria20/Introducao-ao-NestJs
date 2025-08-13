import { Test, TestingModule } from "@nestjs/testing"
import { UsersController } from "./users.controller"
import { UsersService } from "./users.service"

const mockUserService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
}


describe("User Controller Tests", () => {
    let controller: UsersController;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {provide: UsersService, useValue: mockUserService}
            ],
        }).compile()

        controller = module.get<UsersController>(UsersController)
    });
    it('deve listar todos os usuários', async () => {
        const users = [
            {name: "Luana", email: "luana@gmail.com"},
            {name: "Marília", email: "Marilia@gmail.com"}
        ]
        mockUserService.findAll.mockResolvedValue(users)

        expect(await controller.findAll()).toEqual(users)
    })

    it('deve retornar um usuário pelo ID', async () => {
    const user = { id: '1', name: 'Jonas', email: 'jonas@gmail.com' };
    mockUserService.findOne.mockResolvedValue(user);

    expect(await controller.findOne('1')).toEqual(user);
    
  });

  it('deve atualizar um usuário', async () => {
    const dto = { name: 'Usuário Atualizado' };
    const updatedUser = { id: '1', ...dto };
    mockUserService.update.mockResolvedValue(updatedUser);

    expect(await controller.update('1', dto)).toEqual(updatedUser);
    
  });

  it('deve remover um usuário', async () => {
    const result = { deleted: true };
    mockUserService.remove.mockResolvedValue(result);

    expect(await controller.remove('1')).toEqual(result);
    expect(mockUserService.remove).toHaveBeenCalledWith('1');
  });

})
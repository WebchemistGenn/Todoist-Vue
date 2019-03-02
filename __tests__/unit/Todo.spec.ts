import Vue from "vue";
import { mount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Todo from "@/views/Todo.vue";

describe("Todo.vue", () => {
  const fakeData = [
    { id: 0, content: "등산하기", createdAt: 1550984912840, completedAt: null },
    { id: 1, content: "축구하기", createdAt: 1550984912840, completedAt: null },
    { id: 2, content: "Vue 스터디 참여", createdAt: 1550984912840, completedAt: null },
  ];

  Vue.use(Vuetify);

  const TodoView = mount(Todo);

  TodoView.setData({
    list: fakeData,
    active: "ALL",
  });

  it("FakeData 3개의 일정을 가지고 시작합니다, 그리고 상태는 ALL 입니다.", () => {
    const count = TodoView.findAll(".item").length;
    expect(count).toBe(3);
    expect(TodoView.vm.$data.active).toBe("ALL");
  });

  it("일정을 추가합니다.", () => {
    TodoView.find("input").setValue("산책하기");
    TodoView.find("form").trigger("submit.prevent");
    const count = TodoView.findAll(".item").length;
    const content = TodoView.findAll(".item").at(0).find("div.content").text();
    expect(count).toBe(4);
    expect(content).toBe("산책하기");
  });

  it("일정을 완료합니다.", () => {
    const content = TodoView.findAll(".item").at(0).find("input[type=checkbox]");
    content.trigger("click");
    expect(TodoView.vm.$data.list[0].isCompleted).toBe(true);
  });

  it("상태를 각 차례 변경하여 체크합니다. ( ALL | ACTIVE | COMPLETED )", () => {
    const allButton = TodoView.find("button.all");
    const activeButton = TodoView.find("button.active");
    const completedButton = TodoView.find("button.completed");

    allButton.trigger("click");
    expect(TodoView.vm.$data.active).toBe("ALL");
    expect(TodoView.findAll(".item").length).toBe(4);

    activeButton.trigger("click");
    expect(TodoView.vm.$data.active).toBe("ACTIVE");
    expect(TodoView.findAll(".item").length).toBe(3);

    completedButton.trigger("click");
    expect(TodoView.vm.$data.active).toBe("COMPLETED");
    expect(TodoView.findAll(".item").length).toBe(1);

    TodoView.setData({ active: "ALL" });
  });

  it("일정의 완료를 취소합니다.", () => {
    const content = TodoView.findAll(".item").at(0).find("input[type=checkbox]");
    content.trigger("click");
    expect(TodoView.vm.$data.list[0].completedAt).toBe(null);
  });

  it("일정을 삭제합니다.", () => {
    const removeButton = TodoView.findAll(".item").at(0).find("button.remove");
    removeButton.trigger("click");
    const count = TodoView.findAll(".item").length;
    expect(count).toBe(3);
  });

  it("모든 일정을 초기화합니다.", () => {
    const allRemoveButton = TodoView.find("button.clear");
    allRemoveButton.trigger("click");
    expect(TodoView.findAll(".item").length).toBe(0);
  });
});

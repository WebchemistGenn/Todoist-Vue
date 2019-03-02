import Vue from "vue";
import { mount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Home from "@/views/Home.vue";

describe("Home.vue", () => {
  const fakeData = [
    { id: 0, content: "등산하기", createdAt: 1550984912840, completedAt: null },
    { id: 1, content: "축구하기", createdAt: 1550984912840, completedAt: null },
    { id: 2, content: "Vue 스터디 참여", createdAt: 1550984912840, completedAt: null },
  ];

  Vue.use(Vuetify);

  const HomeView = mount(Home);

  HomeView.setData({
    list: fakeData,
    active: "ALL",
  });

  it("FakeData 3개의 일정을 가지고 시작합니다, 그리고 상태는 ALL 입니다.", () => {
    const count = HomeView.findAll(".item").length;
    expect(count).toBe(3);
    expect(HomeView.vm.$data.active).toBe("ALL");
  });

  it("일정을 추가합니다.", () => {
    HomeView.find("input").setValue("산책하기");
    HomeView.find("form").trigger("submit.prevent");
    const count = HomeView.findAll(".item").length;
    const content = HomeView.findAll(".item").at(0).find("div.content").text();
    expect(count).toBe(4);
    expect(content).toBe("산책하기");
  });

  it("일정을 완료합니다.", () => {
    const content = HomeView.findAll(".item").at(0).find("input[type=checkbox]");
    content.trigger("click");
    expect(HomeView.vm.$data.list[0].isCompleted).toBe(true);
  });

  it("상태를 각 차례 변경하여 체크합니다. ( ALL | ACTIVE | COMPLETED )", () => {
    const allButton = HomeView.find("button.all");
    const activeButton = HomeView.find("button.active");
    const completedButton = HomeView.find("button.completed");

    allButton.trigger("click");
    expect(HomeView.vm.$data.active).toBe("ALL");
    expect(HomeView.findAll(".item").length).toBe(4);

    activeButton.trigger("click");
    expect(HomeView.vm.$data.active).toBe("ACTIVE");
    expect(HomeView.findAll(".item").length).toBe(3);

    completedButton.trigger("click");
    expect(HomeView.vm.$data.active).toBe("COMPLETED");
    expect(HomeView.findAll(".item").length).toBe(1);

    HomeView.setData({ active: "ALL" });
  });

  it("일정의 완료를 취소합니다.", () => {
    const content = HomeView.findAll(".item").at(0).find("input[type=checkbox]");
    content.trigger("click");
    expect(HomeView.vm.$data.list[0].completedAt).toBe(null);
  });

  it("일정을 삭제합니다.", () => {
    const removeButton = HomeView.findAll(".item").at(0).find("button.remove");
    removeButton.trigger("click");
    const count = HomeView.findAll(".item").length;
    expect(count).toBe(3);
  });

  it("모든 일정을 초기화합니다.", () => {
    const allRemoveButton = HomeView.find("button.clear");
    allRemoveButton.trigger("click");
    expect(HomeView.findAll(".item").length).toBe(0);
  });
});
